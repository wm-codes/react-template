import React, { PureComponent } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { withAuth } from 'auth';
import Form from 'components/common/form';

const styles = theme => ({
    text: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        textAlign: 'center',
    },
});

class ForgotPassword extends PureComponent {
    handleSubmit = ({ email }) => {
        this.props.authActions.forgot({
            email,
        });
    };

    render() {
        return (
            <Form
                title="Reset Password"
                preface={
                    <div className={this.props.classes.preface}>
                        Enter the Email address you used to create your account and we’ll
                        send you instructions to reset your password.
                    </div>
                }
                hasEmail
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default withAuth(withStyles(styles)(ForgotPassword));
