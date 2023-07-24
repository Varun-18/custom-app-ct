import React from 'react';
import {
  TabHeader,
  TabularModalPage,
} from '@commercetools-frontend/application-components';
import { useProductFetcher } from '../../hooks/use-products-connector';
import { Switch, useParams, useRouteMatch } from 'react-router-dom';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Spacings from '@commercetools-uikit/spacings';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import { useIntl } from 'react-intl';
import GenralInfo from './GenralInfo';
import { docToFormValues } from './conversions';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useFormik } from 'formik';
import Grid from '@commercetools-uikit/grid';
import Text from '@commercetools-uikit/text';
import Variants from './Variants';

const ProductDetails = (props) => {
  const intl = useIntl();
  const { id } = useParams();
  const { data, loading } = useProductFetcher({ id });
  const match = useRouteMatch();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));

  const formData = docToFormValues(data, projectLanguages);
  console.log(formData, 'form data');
  console.log(data);

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
  });

  if (loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <TabularModalPage
        title={formData.name.en}
        isOpen
        onClose={props.onClose}
        tabControls={
          <>
            <TabHeader to={`${match.url}`} exactPathMatch label="General" />

            <TabHeader to={`${match.url}/variant`} label="Variants" />
            <TabHeader to={`${match.url}/search`} label="Int / Ext Search" />
            <TabHeader
              to={`${match.url}/selections`}
              label="Product Selections"
            />
          </>
        }
      >
        <div>
          <Spacings.Stack scale="m">
            <Switch>
              <SuspendedRoute path={`${match.path}`} exact>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                  }}
                >
                  <GenralInfo formik={formik} />
                  <div style={{ flexGrow: '1', padding: '20px' }}>
                    <Spacings.Stack scale="l">
                      <Grid display="inline-grid" gridGap="20px">
                        <Grid.Item>
                          <Text.Detail tone="secondary" as="span">
                            Date Created :
                          </Text.Detail>
                          <span>{'  '}</span>
                          <Text.Detail tone="secondary" as="span">
                            {new Date(data?.createdAt).toLocaleString()}
                          </Text.Detail>
                        </Grid.Item>

                        <Grid.Item>
                          <Text.Detail tone="secondary" as="span">
                            Date Modified :
                          </Text.Detail>
                          <span>{'  '}</span>
                          <Text.Detail tone="secondary" as="span">
                            {new Date(data?.lastModifiedAt).toLocaleString()}
                          </Text.Detail>
                        </Grid.Item>
                      </Grid>
                    </Spacings.Stack>
                  </div>
                </div>
              </SuspendedRoute>

              <SuspendedRoute path={`${match.path}/variant`} exact>
                <Variants />
              </SuspendedRoute>
              <SuspendedRoute path={`${match.path}/search`} exact>
                "hye from search"
              </SuspendedRoute>
              <SuspendedRoute path={`${match.path}/selections`} exact>
                "hye from product selections"
              </SuspendedRoute>
            </Switch>
          </Spacings.Stack>
        </div>
      </TabularModalPage>
    );
  }
};

export default ProductDetails;
