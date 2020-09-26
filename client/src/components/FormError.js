import React from 'react';

import {ErrorText} from './Styles';

const FormError = ({errors, touched, name}) => {
    if (errors[name] && touched[name]) {
        return (
            <ErrorText>{errors[name]}</ErrorText>
        );
    }

    return null;
};

export default FormError;
