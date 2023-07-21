import React, { useState } from 'react';
import {
  FormModalPage,
  TabHeader,
  TabularMainPage,
} from '@commercetools-frontend/application-components';
import { useProductFetcher } from '../../hooks/use-products-connector';
import { useForm } from 'react-hook-form';
import { Switch, useParams, useRouteMatch } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Spacings from '@commercetools-uikit/spacings';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';

const ProductDetails = (props) => {
  console.log('productDeatails callled');

  const match = useRouteMatch();
  const { register, setValue } = useForm();
  const [tab, setTab] = useState(0);
  const { id } = useParams();
  const { data, loading } = useProductFetcher({ id });

  // useEffect(() => {
  //   if (data) {
  //     setValue('name', data?.product?.masterData?.current?.name);
  //     setValue('key', data?.product?.key);
  //   }
  // }, [loading]);

  console.log(data);

  if (loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <FormModalPage
        onClose={props.onClose}
        isOpen
        hideControls={true}
        
      >
        <TabularMainPage
          title="Porducts Deatails"
          tabControls={
            <>
              <TabHeader to={`${match.url}`} exactPathMatch label="General" />

              <TabHeader to={`${match.url}/variant`} label="Variants" />
            </>
          }
        >
          <br />

          <div style={{ marginTop: '30px' }}>
            <Spacings.Stack scale="m">
              <Switch>
                <SuspendedRoute path={`${match.path}`} exact>
                  "hey"
                </SuspendedRoute>

                <SuspendedRoute path={`${match.path}/variant`} exact>
                  "hye from variant"
                </SuspendedRoute>
              </Switch>
            </Spacings.Stack>
          </div>
        </TabularMainPage>
      </FormModalPage>
    );
  }
};

export default ProductDetails;
