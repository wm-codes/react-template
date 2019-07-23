import React, {
    createContext,
    useContext,
    useEffect,
    useState, 
    useCallback,
} from 'react';

import Fetch from 'utils/fetch';
import {
    LOGIN,
    LOGOUT,
    REGISTER,
    GET_USER_INFO,
} from 'constants/actionTypes';
import Snackbar from 'components/common/snackbar';

const defaultAuthState = {
    status: {
        isLoading: false,
        showMessage: false,
    }
};

const AuthContext = createContext(defaultAuthState);

export const useAuthStore = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isResolved, setIsResolved] = useState(false);
    const [status, setStatus] = useState(defaultAuthState.status);
    const [user, setUser] = useState(null);
        
    const handleClose = useCallback((event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setStatus(prevStatus => ({
            ...prevStatus,
            showMessage: false,
        }));
        
    }, []);

    const showError = useCallback(message => {
        setStatus({
            type: 'error',
            showMessage: true,
            message,
            isLoading: false,
        });
    }, []);
    
    const handleResponse = useCallback(async (request, action) => {
        const response = await request;

        if (response && response.errorMessage) {
            showError(response.errorMessage);
            return false;
        }

        setStatus({
            ...status,
            isLoading: true,
        });

        switch (action.type) {
            case LOGIN:
                setUser(response.user);
                response.user && window.localStorage.setItem('rToken', response.token);
                break;
            case GET_USER_INFO:
                setUser(response);
                break;
            case REGISTER:
                setStatus({
                    type: 'success',
                    message: response.message,
                    showMessage: true,
                });
                break;
            case LOGOUT:
                setUser(null);
                setStatus(defaultAuthState.status);
                window.localStorage.removeItem('rToken');
                break;
            default:
                break;
        }

        setStatus({
            ...status,
            isLoading: false,
        });

        return response;
      }, [showError, status]);

    const login = useCallback(async data => await handleResponse(
        Fetch.post('/sign-in', { body: data }),
        LOGIN,
    ), [handleResponse]);

    const getUserInfo = useCallback(async () => await handleResponse(
        Fetch.get('/api/users/info'),
        GET_USER_INFO,
    ), [handleResponse]);
    
    const logout = useCallback(async () => await handleResponse(
        Promise.resolve(), // Logout function actually deletes only token from local storage
        LOGOUT,
    ), [handleResponse]);
    
    const register = useCallback(async data => await handleResponse(
        Fetch.post('/sign-up', { body: data }),
        REGISTER,
    ), [handleResponse]);
    
    useEffect(() => {
        async function getUserData() {
            window.localStorage.getItem('rToken') && await getUserInfo();
            setIsResolved(true);
        }

        getUserData();
    }, [isResolved, getUserInfo]);

    return (
        <>
            <Snackbar
                open={status.showMessage}
                variant={status.type}
                message={status.message}
                onClose={handleClose}
            />
            <AuthContext.Provider
                value={{
                    state: {
                        status,
                        user,
                    },
                    actions: {
                        login,
                        register,
                        logout,
                        getUserInfo,
                    },
                }}
            >
                {isResolved && children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthProvider;
