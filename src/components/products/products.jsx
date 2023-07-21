import React from 'react';
import '../../index.css';
import { Pagination } from '@commercetools-uikit/pagination';
import DataTable from '@commercetools-uikit/data-table';

import CheckboxInput from '@commercetools-uikit/checkbox-input';
import {
  useDataTableSortingState,
  usePaginationState,
  useRowSelection,
} from '@commercetools-uikit/hooks';

import Stamp from '@commercetools-uikit/stamp';

import { useProductsFetcher } from '../../hooks/use-products-connector';
import Spacings from '@commercetools-uikit/spacings';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import ProductDetails from '../product-details';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

const products = () => {
  const match = useRouteMatch();
  const { push } = useHistory();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  const { page, perPage } = usePaginationState();
  const { data, loading } = useProductsFetcher({
    page,
    perPage,
    tableSorting,
  });

  const columns = [
    {
      key: 'checkBox',
      label: <CheckboxInput />,
    },
    { key: 'name', label: 'Product Name', isSortable: true },
    { key: 'type', label: 'Product type' },
    { key: 'key', label: 'Product key' },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Date created', isSortable: true },
    { key: 'lastModifiedAt', label: 'Date Modified', isSortable: true },
  ];

  const itemRender = (item, column) => {
    switch (column.key) {
      case 'checkBox':
        return <CheckboxInput />;
      case 'name':
        return item.masterData.current.name;
      case 'type':
        return item.productType.name;
      case 'key':
        return item.key;
      case 'status':
        return item.masterData.published ? (
          item.masterData.hasStagedChanges ? (
            <Stamp tone="warning" label="Modified" />
          ) : (
            <Stamp tone="primary" label="Published" />
          )
        ) : (
          <Stamp tone="critical" label="Unpublished" />
        );
      case 'createdAt':
        const newDate = new Date(item.createdAt);
        const finalDate =
          newDate.getDay() +
          '/' +
          newDate.getMonth() +
          '/' +
          newDate.getFullYear() +
          ' ' +
          newDate.getHours() +
          ':' +
          newDate.getMinutes();

        return finalDate;
      case 'lastModifiedAt':
        const modifyDate = new Date(item.lastModifiedAt);
        const newModifyDate =
          modifyDate.getDay() +
          '/' +
          modifyDate.getMonth() +
          '/' +
          modifyDate.getFullYear() +
          ' ' +
          modifyDate.getHours() +
          ':' +
          modifyDate.getMinutes();

        return newModifyDate;
    }
  };

  console.log(data);
  console.log(page, perPage);
  if (loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            padding: '20px',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontWeight: 'bold', fontSize: '30px' }}>Products</span>
          <button style={{ background: 'none' }}>Add products</button>
        </div>
        {data ? (
          <div>
            <Spacings.Stack scale="l">
              <DataTable
                columns={columns}
                rows={data.results}
                itemRenderer={itemRender}
                sortedBy={tableSorting.value.key}
                sortDirection={tableSorting.value.order}
                onSortChange={tableSorting.onChange}
                onRowClick={(row) => push(`${match.url}/${row.id}`)}
              />
              <Pagination
                page={page.value}
                onPageChange={page.onChange}
                perPage={perPage.value}
                onPerPageChange={perPage.onChange}
                totalItems={data.total}
              />
            </Spacings.Stack>

            <Switch>
              <Route path={`${match.path}/:id`}>
                <ProductDetails onClose={() => push(`${match.url}`)} />
              </Route>
            </Switch>
          </div>
        ) : null}
      </div>
    );
  }
};

export default products;
