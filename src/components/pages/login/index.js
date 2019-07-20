import React, { memo, useCallback, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from 'auth';
import Form from 'components/common/form';

const SignIn = ({ history }) => {

    const { actions: authActions } = useContext(AuthContext);

    const handleSubmit = useCallback(async ({ email, password }) => {
        const user = await authActions.login({
            email,
            password,
        });

        if (user) {
            history.push('admin/users');
        }
    }, [authActions, history]);

    return !localStorage.getItem('rToken')
        ? (
            <Form
                title="Sign In"
                hasEmail
                hasPassword
                hidePasswordTitle
                footerRegister
                onSubmit={handleSubmit}
            />
        )
        : <Redirect to="/" />
};

export default memo(SignIn);
