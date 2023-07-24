import DataTable from '@commercetools-uikit/data-table';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { size } from 'lodash';
import { useParams, useRouteMatch } from 'react-router-dom';
import { fetchVariants } from '../../hooks/use-products-connector';

const Variants = () => {
  const { id } = useParams();

  const match = useRouteMatch();
  console.log(id);
  const { data, loading } = fetchVariants({ id });
  console.log(data);

  const columns = [
    { key: 'prod_no', label: 'no' },
    { key: 'variantId', label: 'Variant ID' },
    { key: 'sku', label: 'SKU' },
    { key: 'key', label: 'key' },
    { key: 'img', label: 'Images' },
    { key: 'price', label: 'price' },
    { key: 'attributes', label: 'attributes' },
  ];

  const itemRender = (item, column) => {
    switch (column.key) {
      case 'prod_no':
        return item.id;
      case 'variantId':
        return item.id;
      case 'sku':
        return item.sku;
      case 'key':
        return item.key;
      case 'img':
        return 'image';
      case 'price':
        return item?.prices[0]?.centAmount / item?.prices[0]?.fractionDigits;
      case 'attributes':
        return size(item?.attributesRaw);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      hello from the variants screen
      <div>
        <DataTable
          columns={columns}
          rows={data}
          itemRenderer={itemRender}
          //   sortedBy={tableSorting.value.key}
          //   sortDirection={tableSorting.value.order}
          //   onSortChange={tableSorting.onChange}
          onRowClick={(row) => push(`${match.url}/${row.id}`)}
        />
      </div>
    </div>
  );
};

export default Variants;
