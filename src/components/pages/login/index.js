import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

import { withAuth } from 'auth';
import Form from 'components/common/form';

class SignIn extends PureComponent {
    handleSubmit = async ({ email, password }) => {
        const user = await this.props.authActions.login({
            email,
            password,
        });

        if (user) {
            this.props.history.push('/users');
        }
    };
    render() {
        return !localStorage.getItem('rToken')
            ? (
                <Form
                    title="Sign In"
                    hasEmail
                    hasPassword
                    hidePasswordTitle
                    footerRegister
                    onSubmit={this.handleSubmit}
                />
            )
            : <Redirect to="/" />
    }
}

export default withAuth(SignIn);
