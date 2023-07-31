import {
  useMcMutation,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import fetchProductsQuery from './fetch-products-ctp.graphql';
import fetchProductQuery from './fetch-product-detail.graphql';
import fetchVariantQuery from './fetch-variants.graphql';
import updateStatus from './update-products-status.graphql';

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

export const useChangeStatus = () => {
  const [updateStatusPerProduct, { data }] = useMcMutation(updateStatus);
  const changeStatus = async (e, items, setAllcheck, setItems) => {
    try {
      // const newItems =
      //   e.target.value === 'publish'
      //     ? items.filter((item) => item.published === true)
      //     : items.filter((item) => item.published === false);

      const actions =
        e.target.value === 'publish'
          ? [{ publish: { scope: 'All' } }]
          : [{ unpublish: { dummy: '' } }];

      const result = await Promise.all(
        items.map(async (product) => {
          await updateStatusPerProduct({
            variables: {
              productId: product.id,
              version: parseInt(product.version),
              actions,
            },
            context: {
              target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
            },
          });
        })
      );
      console.log(result);
      setItems([]);
      setAllcheck(false);
    } catch (error) {}
  };
  return { changeStatus };
};
