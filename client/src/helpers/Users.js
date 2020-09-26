import * as validator from 'validator';

import {DEFAULT_USER_AUTH} from '../Consts';

export const getStoredUserAuth = () => {
    const auth = window.localStorage.getItem('user');
    if (auth) {
        return JSON.parse(auth);
    }
    return DEFAULT_USER_AUTH;
};

export const validateLoginForm = (email, password, setError) => {
    if (!email || !password) {
        setError('Please enter a valid email and password.');
        return false;
    }

    if (!validator.isEmail(email)) {
        setError('Please enter a valid email address.');
        return false;
    }

    return true;
};

export const validateRegistrationForm = (firstName, lastName, email, password, passwordConfirm, phone, setError) => {
    if (!validator.isEmail(email)) {
        setError('Please enter a valid email address.');
        return false;
    }

    if (!firstName || !lastName || !email || !password || !passwordConfirm || !phone) {
        setError('Please complete all fields.');
        return false;
    }

    return true;
};
