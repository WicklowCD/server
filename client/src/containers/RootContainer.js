import React, {useContext} from 'react';

import {authContext} from '../contexts/AuthContext';
import AuthenticatedContainer from './AuthenticatedContainer';
import UnauthenticatedContainer from './UnauthenticatedContainer';

function RootContainer() {
    const {auth} = useContext(authContext);
    return (
        <div>
            {auth.email !== '' ? (
                <AuthenticatedContainer/>
            ) : (
                <UnauthenticatedContainer/>
            )}
        </div>
    );
}

export default RootContainer;
