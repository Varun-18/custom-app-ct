import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import dayjs from 'dayjs';
import _, { sortBy } from 'lodash';
import { useReport } from '../../hooks/use-reports';
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
} from 'recharts';
import SelectInput from '@commercetools-uikit/select-input';
import { useState } from 'react';
import { genrateDateValues, genrateLabels } from '../../helpers';

const Reports = () => {
  // const weekStart = dayjs().startOf('week').format('DD-MM-YYYY');
  // const weekEnd = dayjs().endOf('week').format('DD-MM-YYYY');

  console.log(
    genrateDateValues('week'),
    genrateDateValues('month'),
    '--------'
  );

  const [dateValues, setDateValues] = useState(null);
  const [selectValues, setSelectValues] = useState(genrateLabels('week'));
  const { abandonedCarts, error, loading, soldCarts } = useReport(
    dateValues === null ? genrateDateValues('week') : dateValues
  );

  const selectOptions = [
    { label: genrateLabels('week'), value: genrateDateValues('week') },
    { label: genrateLabels('month'), value: genrateDateValues('month') },
    { label: genrateLabels('year'), value: genrateDateValues('year') },
  ];

  const orderDates =
    soldCarts &&
    soldCarts?.results.map((data) => ({
      ...data,
      createdAt: dayjs(data.createdAt).format('YYYY/MM/DD'),
    }));

  const activeDates =
    abandonedCarts &&
    abandonedCarts?.results.map((data) => ({
      ...data,
      lastModifiedAt: dayjs(data.lastModifiedAt)
        .add(14, 'd')
        .format('YYYY/MM/DD'),
    }));

  const orderResult = _(orderDates)
    .groupBy('createdAt')
    .map((items, finalDate) => ({
      finalDate,
      ordered: items.length,
      abandoned: 0,
    }))
    .value();

  const activeResult = _(activeDates)
    .groupBy('lastModifiedAt')
    .map((items, finalDate) => ({
      finalDate,
      abandoned: items.length,
      ordered: 0,
    }))

    .value();

  console.log(activeResult, orderResult, '**********');

  const mergedArr = [...activeResult, ...orderResult];
  let commonDates = [];
  let result = [];

  if (activeResult.length || orderResult.length > 0) {
    for (let i = 0; i < activeResult.length; i++) {
      for (let j = 0; j < orderResult.length; j++) {
        if (activeResult[i].finalDate === orderResult[j].finalDate) {
          commonDates.push({
            finalDate: activeResult[i].finalDate,
            ordered: activeResult[i].ordered + orderResult[j].ordered,
            abandoned: activeResult[i].abandoned + orderResult[j].abandoned,
          });
        }
      }
    }

    const filterDates = commonDates.map((item) => {
      return item.finalDate;
    });

    const unCommonDates = mergedArr.filter(
      (o) => !filterDates.find((x) => x === o.finalDate)
    );

    result = [...unCommonDates, ...commonDates];

    result = sortBy(result, ['finalDate']);

    result.forEach(
      (item) =>
        (item.finalDate =
          dayjs(item.finalDate).format('D') +
          ' ' +
          dayjs(item.finalDate).format('MMM'))
    );

    // console.log(filterDates);
    // console.log(unCommonDates, '*********-----------*********');
    // console.log(result, '*********-----------*********');
  }

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <span style={{ fontWeight: 'bold', fontSize: '30px' }}>
            Cart Statistics
          </span>
        </div>
        <div style={{ width: '50%' }}>
          <SelectInput
            name="form-field-name"
            value={selectValues}
            onChange={(e) => {
              console.log(e, 'from select');
              setDateValues(e.target.value);
              setSelectValues(genrateLabels(e.target.value.type));
            }}
            options={selectOptions}
          />
        </div>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={result}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00b39e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00b39e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4b4b4b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4b4b4b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="finalDate" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Area
              type="monotone"
              dataKey="abandoned"
              stroke="#00b39e"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="ordered"
              stroke="#4b4b4b"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
