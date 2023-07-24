import { defineMessages } from 'react-intl';

export default defineMessages({
  backToProductList: {
    id: 'ProductDetails.backToProductList',
    defaultMessage: 'Back to Product list',
  },
  duplicateKey: {
    id: 'ProductDetails.duplicateKey',
    defaultMessage: 'A product with this key already exists.',
  },
  productUpdated: {
    id: 'ProductDetails.productUpdated',
    defaultMessage: 'product {productName} updated',
  },
  productKeyLabel: {
    id: 'ProductDetails.productKeyLabel',
    defaultMessage: 'product key',
  },
  productNameLabel: {
    id: 'ProductDetails.productNameLabel',
    defaultMessage: 'Product Name',
    description: 'Enter the product name in their corresponding locales.',
  },
  productNameDesc: {
    id: 'ProductDetails.productNameDesc',
    defaultMessage: 'Enter the product name in their corresponding locales.',
  },
  productKeyLabel: {
    id: 'ProductDetails.productKeyLabel',
    defaultMessage: 'Product Key',
  },
  productKeyDesc: {
    id: 'ProductDetails.productKeyDesc',
    defaultMessage: 'Product Key description',
  },
  productRolesLabel: {
    id: 'ProductDetails.productRolesLabel',
    defaultMessage: 'product roles',
  },
  hint: {
    id: 'ProductDetails.hint',
    defaultMessage:
      'This page demonstrates for instance how to use forms, notifications and how to update data using GraphQL, etc.',
  },
  modalTitle: {
    id: 'ProductDetails.modalTitle',
    defaultMessage: 'Edit product',
  },
  ProductDetailsErrorMessage: {
    id: 'ProductDetails.errorMessage',
    defaultMessage:
      'We were unable to fetch the product details. Please check your connection, the provided product ID and try again.',
  },
});
