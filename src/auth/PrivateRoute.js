import React, { memo, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Loader from 'components/common/loader';
import Layout from 'components/common/layout';

const PrivateRoute = ({ hasAccess, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => hasAccess
            ?  (
                <Layout>
                    <Suspense fallback={<Loader />}>
                        <Component {...props}/>
                    </Suspense>
                </Layout>
            )
            : <Redirect to="/sign-in" />
        }
    />
)

export default memo(PrivateRoute);
