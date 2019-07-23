import React, { memo, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { useAuthStore } from 'auth';
import Form from 'components/common/form';

const useStyles = makeStyles(theme => ({
    text: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        textAlign: 'center',
    },
}));

const ForgotPassword = () => {

    const { actions: authActions } = useAuthStore();

    const classes = useStyles();

    const handleSubmit = useCallback(({ email }) => {
        authActions.forgot({
            email,
        });
    }, [authActions]);

    return (
        <Form
            title="Reset Password"
            preface={
                <div className={classes.preface}>
                    Enter the Email address you used to create your account and we’ll
                    send you instructions to reset your password.
                </div>
            }
            hasEmail
            onSubmit={handleSubmit}
        />
    );
};

export default memo(ForgotPassword);
