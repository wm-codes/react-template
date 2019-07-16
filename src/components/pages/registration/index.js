import React, { memo } from 'react';

import { withAuth } from 'auth';
import Form from 'components/common/form';

const SignUp = ({ authActions }) => {
    const handleSubmit = ({ email, password }) => {
        authActions.register({
            email,
            password,
        });        
    };

    return (
        <Form
            title="Sign Up"
            hasEmail
            hasPassword
            hasConfirmPassword
            onSubmit={handleSubmit}
        />
    );
};

export default withAuth(memo(SignUp));
