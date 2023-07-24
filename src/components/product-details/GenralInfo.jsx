import React from 'react';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Text from '@commercetools-uikit/text';
import TextField from '@commercetools-uikit/text-field';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import { useIntl } from 'react-intl';
import messages from './messages';

const GenralInfo = ({ formik }) => {
  const intl = useIntl();
  console.log(formik.values.name, 'formik.values.name');
  return (
    <div style={{ flexGrow: '1' }}>
      <CollapsiblePanel
        header={<Text.Headline as="h3">Genral Information</Text.Headline>}
      >
        <LocalizedTextField
          name="name"
          title={intl.formatMessage(messages.productNameLabel)}
          value={formik.values.name}
          selectedLanguage="en"
          description={intl.formatMessage(messages.productNameDesc)}
          isRequired
        />
      </CollapsiblePanel>
      <CollapsiblePanel
        header={<Text.Headline as="h3">Product Attributes</Text.Headline>}
      >
        <TextField
          title={intl.formatMessage(messages.productKeyLabel)}
          description={intl.formatMessage(messages.productKeyDesc)}
          value={formik.values.key}
        />
      </CollapsiblePanel>
    </div>
  );
};

export default GenralInfo;
