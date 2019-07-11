import React, { PureComponent } from 'react';

import Fetch from 'utils/fetch';
import {
    LOGIN,
    LOGOUT,
    REGISTER,
    GET_USER_INFO,
} from 'constants/actionTypes';
import Snackbar from 'components/common/snackbar';

const defaultAuthState = {
    isLoading: false,
    status: {
        showMessage: false,
    },
};

const AuthContext = React.createContext(defaultAuthState);

const withAuth = Component => props => (
    <AuthContext.Consumer>
        {value => <Component
            {...props}
            authState={value.state}
            authActions={value.actions}
        />}
    </AuthContext.Consumer>
);

class AuthProvider extends PureComponent {
    state = {
        ...defaultAuthState,
        isResolved: false,
    };

    async componentDidMount() {
        window.localStorage.getItem('rToken') && await this.getUserInfo();
        this.setState({ isResolved: true });
    }

    async handleResponse(request, action) {
        this.setState({ isLoading: true });
        const response = await request;

        if (response && response.errorMessage) {
            this.showError(response.errorMessage);
            return false;
        }

        switch (action) {
            case LOGIN:
                this.setState({
                    user: response.user,
                });
                response.user && window.localStorage.setItem('rToken', response.token);
                break;
            case GET_USER_INFO:
                this.setState({
                    user: response,
                });
                break;
            case REGISTER:
                this.setState({
                    status: {
                        type: 'success',
                        message: response.message,
                        showMessage: true,
                    }
                });
                break;
            case LOGOUT:
                this.setState(defaultAuthState);
                window.localStorage.removeItem('rToken');
                break;
            default:
                break;
        }

        this.setState({
            isLoading: false,
        });

        return response;
    }

    login = async data => await this.handleResponse(
        Fetch.post('/sign-in', { body: data }),
        LOGIN,
    );

    getUserInfo = async _ => await this.handleResponse(
        Fetch.get('/api/users/info'),
        GET_USER_INFO,
    );

    logout = async _ => await this.handleResponse(
        Promise.resolve(), // Logout function actually deletes only token from local storage
        LOGOUT,
    );

    register = async data => await this.handleResponse(
        Fetch.post('/sign-up', { body: data }),
        REGISTER,
    );

    showError(message) {
        this.setState({
            status: {
                type: 'error',
                showMessage: true,
                message,
            }
        });
    }
    
    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({
            status: {
                ...this.state.status,
                showMessage: false,
            }
        });
    };

    render() {
        const {
            state,
            login,
            logout,
            register,
            getUserInfo,
        } = this;
        const { status } = this.state;

        return (
            <>
                <Snackbar
                    open={status.showMessage}
                    variant={status.type}
                    message={status.message}
                    onClose={this.handleClose}
                />
                <AuthContext.Provider
                    value={{
                        state,
                        actions: {
                            login,
                            logout,
                            register,
                            getUserInfo,
                        },
                    }}
                >
                    {this.state.isResolved && this.props.children}
                </AuthContext.Provider>
            </>
        );
    }
}

export { withAuth };

export default AuthProvider;
