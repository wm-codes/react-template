import React, { memo, useContext, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'query-string';

import { AuthContext } from 'auth';
import Form from 'components/common/form';

const ResetPassword = ({ history }) => {

    const { actions: authActions } = useContext(AuthContext);

    const handleSubmit = useCallback(({ password, confirmPassword }) => {
        authActions.reset({
            password,
            confirm_password: confirmPassword,
        });
    }, [authActions]);

    const params = qs.parse(history.location.search);

    return !params.email || !params.email_token
        ? <Redirect to="/" />
        : (
            <Form
                title="Set Password"
                hasPassword
                hasConfirmPassword
                onSubmit={handleSubmit}
            />
        );
};

export default memo(ResetPassword);
