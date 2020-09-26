import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Button, FormGroup, Input} from 'reactstrap';
import * as Yup from 'yup';

import api from '../../helpers/Api';
import {MainLogo, Wrapper, H1, H2, ErrorText} from '../../components/Styles';
import Logo from '../../logo.png';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short')
            .required('First Name is Required'),
        lastName: Yup.string()
            .min(2, 'Too Short')
            .required('Last Name is Required'),
        phone: Yup.string()
            .min(2, 'Too Short')
            .required('Phone Number is Required'),
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is Required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .required('Password is Required'),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password Confirm must match Password'),
    });

    const initialValues = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        passwordConfirm: '',
    };

    const handleSubmit = async (values) => {
        try {
            setLoading(true);

            const response = await api({
                method: 'post',
                url: `/auth/register`,
                data: {
                    first_name: values.firstName,
                    last_name: values.lastName,
                    email: values.email,
                    password: values.password,
                    phone: values.phone,
                },
            });

            if (response.status === 201) {
                setRegistrationSuccessful(true);
            } else {
                setLoading(false);
                toast.error(response.data.error);
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.data.error);
        }
    };

    if (registrationSuccessful) {
        toast.success(
            'Registration Successful. Your account is pending activation by an administrator.',
        );
        return <Redirect push to='/login'/>;
    }

    return (
        <Wrapper>
            <Formik onSubmit={handleSubmit} validationSchema={validationSchema}
                    initialValues={initialValues}>
                {({values, handleBlur, handleChange, errors, touched}) => (
                    <Form>
                        <MainLogo src={Logo} alt='Civil Defence Logo'/>
                        <H1>Wicklow Civil Defence</H1>
                        <H2>User Registration</H2>
                        <FormGroup>
                            <Input
                                type='text'
                                name='firstName'
                                placeholder='First Name'
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.firstName && touched.firstName ? (
                                <ErrorText>{errors.firstName}</ErrorText>
                            ) : null}
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type='text'
                                name='lastName'
                                placeholder='Last Name'
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lastName && touched.lastName ? (
                                <ErrorText>{errors.lastName}</ErrorText>
                            ) : null}
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type='text'
                                name='phone'
                                placeholder='Phone Number'
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.phone && touched.phone ? (
                                <ErrorText>{errors.phone}</ErrorText>
                            ) : null}
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type='email'
                                name='email'
                                placeholder='Email Address'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email ? (
                                <ErrorText>{errors.email}</ErrorText>
                            ) : null}
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type='password'
                                name='password'
                                placeholder='Password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password ? (
                                <ErrorText>{errors.password}</ErrorText>
                            ) : null}
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type='password'
                                name='passwordConfirm'
                                placeholder='Confirm Password'
                                value={values.passwordConfirm}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.passwordConfirm && touched.passwordConfirm ? (
                                <ErrorText>{errors.passwordConfirm}</ErrorText>
                            ) : null}
                        </FormGroup>
                        <br/>
                        <Button
                            type='submit'
                            disabled={loading}
                            variant='contained'
                            color='primary'
                        >
                            {loading ? 'Loading...' : 'Register'}
                        </Button>
                        <br/><br/>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Register;
