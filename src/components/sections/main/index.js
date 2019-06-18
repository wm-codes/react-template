import React, { memo, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import { withAuth } from 'auth';
import PrivateRoute from 'auth/PrivateRoute';

const Login = lazy(() => import('components/pages/login'));
const Registration = lazy(() => import('components/pages/registration'));
const ForgotPassword = lazy(() => import('components/pages/forgot-password'));
const ResetPassword = lazy(() => import('components/pages/reset-password'));
const Users = lazy(() => import('components/pages/users'));
const UsersForm = lazy(() => import('components/pages/users-form'));

const styles = {
    main: {
        position: 'relative',
        top: '70px',
        width: '100%',
        height: '100%',
    },
};

const Main = ({ authState: { user = {}, isLoading }, classes }) => {
    const isAdmin = user.type === 'admin';

    return (
        <main className={`App ${classes.main}`}>
            <Switch>
                <Route
                    exact
                    path="/sign-in"
                    component={Login}
                />
                <Route
                    exact
                    path="/sign-up"
                    component={Registration}
                />
                <Route
                    exact
                    path="/forgot-password"
                    component={ForgotPassword}
                />
                <Route
                    exact
                    path="/reset-password"
                    component={ResetPassword}
                />
                <PrivateRoute
                    exact
                    path="/users"
                    component={Users}
                    hasAccess={isAdmin}
                />
                <PrivateRoute
                    exact
                    path="/users/:userId/edit"
                    component={UsersForm}
                    hasAccess={isAdmin}
                />
                <Redirect to="/users"/>
            </Switch>
        </main>
    );
}

export default withAuth(memo(withStyles(styles)(Main)));
