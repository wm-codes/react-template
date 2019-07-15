import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'query-string';

import { withAuth } from 'auth';
import Form from 'components/common/form';

const ResetPassword = ({authActions, history}) => {
    const handleSubmit = ({ password, confirmPassword }) => {
        authActions.reset({
            password,
            confirm_password: confirmPassword,
        });
    };

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
}

export default withAuth(memo(ResetPassword));
