import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.min.css';

import AuthContextProvider from './contexts/AuthContext';
import RootContainer from './containers/RootContainer';

const App = () => {
    return (
        <AuthContextProvider>
            <RootContainer/>
            <ToastContainer
                position='bottom-left'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                pauseOnHover={true}
            />
        </AuthContextProvider>
    );
};

export default App;
