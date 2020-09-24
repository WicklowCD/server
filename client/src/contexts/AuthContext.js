import React, {createContext} from 'react';

import useAuthHandler from '../hooks/AuthHandler';
import {DEFAULT_USER_AUTH} from '../Consts';
import {getStoredUserAuth} from '../helpers/Users';

export const authContext = createContext({
    auth: DEFAULT_USER_AUTH,
    setAuthStatus: (userAuth) => {
    },
    setUnauthStatus: () => {
    },
});

const {Provider} = authContext;

const AuthProvider = ({children}) => {
    const {auth, setAuthStatus, setUnauthStatus} = useAuthHandler(
        getStoredUserAuth(),
    );

    return (
        <Provider value={{auth, setAuthStatus, setUnauthStatus}}>
            {children}
        </Provider>
    );
};

export default AuthProvider;
