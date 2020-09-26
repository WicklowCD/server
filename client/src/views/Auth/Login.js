import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import decode from 'jwt-decode';
import {toast} from 'react-toastify';
import {Formik, Form} from 'formik';
import {Button, FormGroup, Input} from 'reactstrap';

import api from '../../helpers/Api';
import {authContext} from '../../contexts/AuthContext';
import Logo from '../../logo.png';
import {MainLogo, H1} from '../../components/Styles';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const auth = useContext(authContext);

    const authHandler = async (values) => {
        try {
            setLoading(true);

            const response = await api({
                method: 'post',
                url: '/auth/login',
                data: {
                    email: values.email,
                    password: values.password,
                },
            });

            if (response.status === 200) {
                const {email, token} = response.data;
                const decoded = decode(token);
                const role = decoded.user_claims.role;
                auth.setAuthStatus({email, token, role});
            } else {
                setLoading(false);
                toast.error(response.data.error);
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.data.message);
        }
    };

    return (
        <Formik onSubmit={(values) => authHandler(values)} initialValues={{email: '', password: ''}}>
            {({values, handleChange, handleBlur}) => (
                <Form>
                    <MainLogo src={Logo} alt='Civil Defence Logo'/>
                    <H1>Wicklow Civil Defence</H1>
                    <FormGroup>
                        <Input
                            type='email'
                            name='email'
                            label='Email Address'
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={'Email Address'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type='password'
                            name='password'
                            label='Password'
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={'Password'}
                        />
                    </FormGroup>
                    <br/>
                    <Button
                        type='submit'
                        disabled={loading}
                        variant={'contained'}
                        color={'primary'}
                    >
                        {loading ? 'Loading...' : 'Sign In'}
                    </Button>
                    <br/><br/>
                    <Link to='/register'>Register New User</Link>
                </Form>
            )}
        </Formik>
    );
};

export default Login;
