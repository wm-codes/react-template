import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';

import { withAuth } from 'auth';
import Form from 'components/common/form';

const SignIn = ({ authActions, history }) => {

    const handleSubmit = async ({ email, password }) => {
        const user = await authActions.login({
            email,
            password,
        });

        if (user) {
            history.push('/users');
        }
    };

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

export default withAuth(memo(SignIn));
