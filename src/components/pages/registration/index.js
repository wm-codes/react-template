import React, { PureComponent } from 'react';

import { withAuth } from 'auth';
import Form from 'components/common/form';

class SignUp extends PureComponent {
    handleSubmit = ({ email, password }) => {
        this.props.authActions.register({
            email,
            password,
        });        
    };

    render() {
        return (
            <Form
                title="Sign Up"
                hasEmail
                hasPassword
                hasConfirmPassword
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default withAuth(SignUp);
