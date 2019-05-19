import React, { memo, lazy, Suspense, useCallback } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Layout from 'components/common/layout';

const User = lazy(() => import('components/pages/users'));
const UserForm = lazy(() => import('components/pages/users-form'));

const PrivateRoute = ({ authType }) => {

    const adminRoutes = [
        '/users',
        '/users/:userId/edit',
    ]

    const renderAdminComponent = useCallback(props => {
        switch (props.match.path) {
            case adminRoutes[0]:
                return <User {...props}/>;
            case adminRoutes[1]:
                return <UserForm {...props}/>;
        }
    }, [])

    return authType === 'admin'
        ? (
            <Route
                exact
                path={adminRoutes}
                render={props => (
                    <Layout>
                        <Suspense fallback={<div>Loading...</div>}>
                            {renderAdminComponent(props)}
                        </Suspense>
                    </Layout>
                )}
            />
        )
        : <Redirect to='/sign-in' />
};

export default memo(PrivateRoute);
