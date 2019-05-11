import React, { memo, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import { withAuth } from 'auth';
import PrivateRoute from 'auth/PrivateRoute';

const Users = lazy(() => import('components/pages/users'));
const Login = lazy(() => import('components/pages/login'));

const styles = {
    main: {
        position: 'relative',
        top: '70px',
        width: '100%',
        height: '100%',
    },
};

const Main = ({ authState: { user = {}, isLoading }, classes }) => {
    return (
        <main className={`App ${classes.main}`}>
            <Switch>
                <Route
                    exact
                    path="/sign-in"
                    component={Login}
                />
                <PrivateRoute
                    isLoading={isLoading}
                    authType={user.type}
                />
                <Route
                    exact
                    path="/"
                    component={Users}
                />
                <Redirect to="/sign-in"/>
            </Switch>
        </main>
    );
}

export default withAuth(memo(withStyles(styles)(Main)));
