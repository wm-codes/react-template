import React, {
    createContext,
    useContext,
    useEffect,
    useState, 
    useCallback,
    useReducer,
    useMemo,
} from 'react';

import Fetch from 'utils/fetch';
import {
    LOGIN,
    LOGOUT,
    REGISTER,
    GET_USER_INFO,
} from 'constants/actionTypes';
import Snackbar from 'components/common/snackbar';

const AuthContext = createContext({});

const actionReducer = (state, { action, payload }) => {
    switch (action.type) {
        case LOGIN:
            payload.user && window.localStorage.setItem('rToken', payload.token);

            return {
                ...state,
                user: payload.user,
            };
        case GET_USER_INFO:
            return {
                ...state,
                user: payload,
            };
        case REGISTER:
            return {
                ...state,
            };
        case LOGOUT:
            window.localStorage.removeItem('rToken');

            return {
                user: null,
            };
        default:
            return {
                ...state,
            };
    }
}

export const AuthProvider = ({ children }) => {
    const [isResolved, setIsResolved] = useState(false);
    const [status, setStatus] = useState({ showMessage: false });
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useReducer(actionReducer, {});

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
        });
    }, []);
    
    const handleResponse = useCallback(async (request, actionType) => {
        const response = await request;

        if (response && response.errorMessage) {
            showError(response.errorMessage);
            return false;
        }

        setIsLoading(true);

        dispatch({
            action: { type: actionType },
            payload: response,
        });

        setIsLoading(false);

        if (actionType === REGISTER) {
            setStatus({
                type: 'success',
                message: response.message,
                showMessage: true,
            });
        }

        return response;
      }, [showError]);

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

    const memoizedActions = useMemo(() => ({
        login,
        register,
        logout,
        getUserInfo,
    }), [login, register, logout, getUserInfo]);

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
                        isLoading,
                        user: state.user,
                    },
                    actions: memoizedActions,
                }}
            >
                {isResolved && children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuthStore = () => useContext(AuthContext);

export default AuthProvider;
