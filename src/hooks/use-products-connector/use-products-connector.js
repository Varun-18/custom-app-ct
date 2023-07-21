import { useQuery } from '@apollo/client';
import {
  useMcQuery,
  useMcMutation,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import fetchProductsQuery from './fetch-products-ctp.graphql';
import fetchProductQuery from './fetch-product-detail.graphql';

export const useProductsFetcher = ({ page, perPage, tableSorting }) => {
  const { data, loading } = useMcQuery(fetchProductsQuery, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  console.log(
    data,
    'from the use products connector------------------->>>>>>>>>'
  );

  return {
    data: data?.products,
    loading,
  };
};

export const useProductFetcher = ({ id }) => {
  const { data, loading } = useMcQuery(fetchProductQuery, {
    variables: {
      id: id,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  console.log(
    data,
    'from the use product connector------------------->>>>>>>>>'
  );

  return {
    data,
    loading,
  };
};
