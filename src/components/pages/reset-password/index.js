import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'query-string';

import { withAuth } from 'auth';
import Form from 'components/common/form';

class ResetPassword extends PureComponent {
    handleSubmit = ({ password, confirmPassword }) => {
        this.props.authActions.reset({
            password,
            confirm_password: confirmPassword,
        });
    };

    render() {
        const params = qs.parse(this.props.history.location.search); 

        return !params.email || !params.email_token
            ? <Redirect to="/" />
            : (
                <Form
                    title="Set Password"
                    hasPassword
                    hasConfirmPassword
                    onSubmit={this.handleSubmit}
                />
            );
    }
}

export default withAuth(ResetPassword);
