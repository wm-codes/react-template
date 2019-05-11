import React, { PureComponent, Fragment } from 'react';
import Fetch from 'utils/fetch';
import {
    LOGIN,
    LOGOUT,
    REGISTER,
    GET_USER_INFO,
} from 'constants/actionTypes';

const defaultAuthState = {
    isAdmin: false,
    isLoading: false,
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
        authMessage: {},
        isResolved: false,
    };

    async componentDidMount() {
        await this.getUserInfo();
        this.setState({ isResolved: true })
    }

    async handleResponse(request, action) {
        this.setState({ isLoading: true });
        const response = await request;

        if (response && response.errorMessage) {
            // TODO handle error messages
            return false;
        }

        switch (action) {
            case LOGIN:
                this.setState({
                    user: response.user,
                })
                response && window.localStorage.setItem('rToken', response.token);
                break;
            case GET_USER_INFO:
                this.setState({
                    user: response,
                })
                break;
            // case REGISTER:
            case LOGOUT:
                delete this.state.user;
                this.setState(defaultAuthState);
                window.localStorage.removeItem('rToken');
                break;
            default:
                break;
        }

        this.setState({
            isLoading: false,
        });

        return request;
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
        Fetch.get('/logout'),
        LOGOUT,
    );

    register = async data => await this.handleResponse(
        Fetch.post('/sign-up', { body: data }),
        REGISTER,
    );

    render() {
        const {
            state,
            login,
            logout,
            register,
            getUserInfo,
        } = this;

        return (
            <Fragment>
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
            </Fragment>
        );
    }
}

export { withAuth };

export default AuthProvider;
