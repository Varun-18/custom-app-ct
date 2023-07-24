import { useMcQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import fetchProductsQuery from './fetch-products-ctp.graphql';
import fetchProductQuery from './fetch-product-detail.graphql';
import fetchVariantQuery from './fetch-variants.graphql';

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

  return {
    data: data?.products,
    loading,
  };
};

export const useProductFetcher = ({ id }) => {
  try {
    console.log(id, '**************');
    const { data, loading, error } = useMcQuery(fetchProductQuery, {
      variables: {
        id,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    });
    console.log(error, '**************');
    return {
      data: data?.product,
      loading,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchVariants = ({ id }) => {
  try {
    console.log(id);
    const { data, loading } = useMcQuery(fetchVariantQuery, {
      variables: {
        id,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    });

    return {
      data: data?.product?.masterData?.current?.allVariants,
      loading,
    };
  } catch (error) {
    console.log(error);
  }
};
