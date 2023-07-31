import {
  transformLocalizedStringToLocalizedField,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import dayjs from 'dayjs';

export const getErrorMessage = (error) =>
  error.graphQLErrors?.map((e) => e.message).join('\n') || error.message;

export const extractErrorFromGraphQlResponse = (graphQlResponse) => {
  if (
    typeof graphQlResponse.networkError?.result !== 'string' &&
    graphQlResponse.networkError?.result?.errors?.length > 0
  ) {
    return graphQlResponse.networkError.result.errors;
  }

  if (graphQlResponse.graphQLErrors?.length > 0) {
    return graphQlResponse.graphQLErrors;
  }

  return graphQlResponse;
};

const getNameFromPayload = (payload) => ({
  name: transformLocalizedStringToLocalizedField(payload.name),
});

const convertAction = (actionName, actionPayload) => ({
  [actionName]:
    actionName === 'changeName'
      ? getNameFromPayload(actionPayload)
      : actionPayload,
});

export const createGraphQlUpdateActions = (actions) =>
  actions.reduce(
    (previousActions, { action: actionName, ...actionPayload }) => [
      ...previousActions,
      convertAction(actionName, actionPayload),
    ],
    []
  );

export const convertToActionData = (draft) => ({
  ...draft,
  name: transformLocalizedFieldToLocalizedString(draft.nameAllLocales || []),
});

export const genrateLabels = (labelOption) => {
  switch (labelOption) {
    case 'week':
      const weekStartDate = dayjs().startOf('week').format('DD-MMM-YYYY');
      const weekEndDate = dayjs().endOf('week').format('DD-MMM-YYYY');
      return `This week  ${weekStartDate} to ${weekEndDate}`;
    case 'month':
      const monthStartDate = dayjs().startOf('month').format('DD-MMM-YYYY');
      const monthEndDate = dayjs().endOf('month').format('DD-MMM-YYYY');
      return `This month ${monthStartDate} to ${monthEndDate}`;
    case 'year':
      const yearStartDate = dayjs().startOf('year').format('DD-MMM-YYYY');
      const yearEndDate = dayjs().endOf('year').format('DD-MMM-YYYY');
      return `This year ${yearStartDate} to ${yearEndDate}`;
  }
};

export const genrateDateValues = (valueOption) => {
  switch (valueOption) {
    case 'week':
      const weekStartDate = dayjs().startOf('week').format('YYYY-MM-DD');
      const weekEndDate = dayjs().endOf('week').format('YYYY-MM-DD');
      return { startDate: weekStartDate, endDate: weekEndDate, type: 'week' };
    case 'month':
      const monthStartDate = dayjs().startOf('month').format('YYYY-MM-DD');
      const monthEndDate = dayjs().endOf('month').format('YYYY-MM-DD');
      return {
        startDate: monthStartDate,
        endDate: monthEndDate,
        type: 'month',
      };
    case 'year':
      const yearStartDate = dayjs().startOf('year').format('YYYY-MM-DD');
      const yearEndDate = dayjs().endOf('year').format('YYYY-MM-DD');
      return { startDate: yearStartDate, endDate: yearEndDate, type: 'year' };
  }
};
