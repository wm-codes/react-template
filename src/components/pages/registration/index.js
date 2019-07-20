import React, { memo, useContext, useCallback } from 'react';

import { AuthContext } from 'auth';
import Form from 'components/common/form';

const SignUp = () => {

    const { actions: authActions } = useContext(AuthContext);

    const handleSubmit = useCallback(({ email, password }) => {
        authActions.register({
            email,
            password,
        });        
    }, [authActions]);

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

export default memo(SignUp);
