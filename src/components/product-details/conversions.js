import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';

export const docToFormValues = (product, languages) => ({
  key: product?.key ?? '',
  name: LocalizedTextInput.createLocalizedString(
    languages,
    transformLocalizedFieldToLocalizedString(
      product?.masterData?.current?.nameAllLocales ?? []
    )
  ),
});

export const formValuesToDoc = (formValues) => ({
  key: formValues.key,
  roles: formValues.roles,
  name: LocalizedTextInput.omitEmptyTranslations(formValues.name),
});
