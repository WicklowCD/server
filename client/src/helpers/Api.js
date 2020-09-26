import axios from 'axios';
import {getStoredUserAuth} from './Users';

const client = axios.create();

const request = (options) => {
    const token = getStoredUserAuth().token;

    if (token) {
        options.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    options.url = `/api${options.url}`;

    const onSuccess = (response) => {
        return response;
    };

    const onError = (error) => {
        return Promise.reject(error.response || error.message);
    };

    return client(options).then(onSuccess).catch(onError);
};

export default request;
