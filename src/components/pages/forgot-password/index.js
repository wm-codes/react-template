import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { withAuth } from 'auth';
import Form from 'components/common/form';

const styles = makeStyles(theme => ({
    text: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        textAlign: 'center',
    },
    preface: {

    }
}));

const ForgotPassword = ({authActions}) => {
    const classes = styles();

    const handleSubmit = ({ email }) => {
        authActions.forgot({
            email,
        });
    };

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
}

export default withAuth(memo(ForgotPassword));
