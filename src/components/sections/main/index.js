import React, { memo, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { withAuth } from 'auth';
import PrivateRoute from 'auth/PrivateRoute';

const Login = lazy(() => import('components/pages/login'));
const Registration = lazy(() => import('components/pages/registration'));
const ForgotPassword = lazy(() => import('components/pages/forgot-password'));
const ResetPassword = lazy(() => import('components/pages/reset-password'));
const Landing = lazy(() => import('components/pages/landing'));

//private routers
const Dashboard = lazy(() => import('components/pages/dashboard'));
const Users = lazy(() => import('components/pages/users'));
// const UsersForm = lazy(() => import('components/pages/users-form'));

const useStyles = makeStyles({
    main: {
        position: 'relative',
        marginTop: 70,
        width: '100%',
        height: '100%',
    },
});

const Main = ({ authState: { user = {}, isLoading } }) => {
    const classes = useStyles();

    let isAdmin = user.type === 'user';

    //remove in live
    // isAdmin = true;

    return (
        <main className={`App ${classes.main}`}>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={Landing}
                />
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
                    path="/admin/dashboard"
                    component={Dashboard}
                    hasAccess={isAdmin}
                />
                <PrivateRoute
                    exact
                    path="/admin/users"
                    component={Users}
                    hasAccess={isAdmin}
                />
                {/*<PrivateRoute*/}
                {/*    exact*/}
                {/*    path="/admin/users/:userId/edit"*/}
                {/*    component={UsersForm}*/}
                {/*    hasAccess={isAdmin}*/}
                {/*/>*/}
                <Redirect to="/"/>
            </Switch>
        </main>
    );
}

export default withAuth(memo(Main));
