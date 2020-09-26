import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Label, FormGroup, Input, Button} from 'reactstrap';
import {Formik, Form} from 'formik';
import {toast} from 'react-toastify';
import moment from 'moment';
import * as Yup from 'yup';

import DatePicker from '../../components/Search/StartDatePicker';
import api from '../../helpers/Api';
import {H1} from '../../components/Styles';
import FormError from '../../components/FormError';

const CreateRecord = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchId, setSearchId] = useState();
    const [created, setCreated] = useState(false);
    const [authorized, setAuthorized] = useState(true);

    const initialValues = {
        location: '',
        date: moment(),
        start_time: moment().format('HH:mm').toString(),
        type: '',
        oic: '',
        sm: '',
        so: '',
        sl: '',
        ro: '',
        scribe: '',
    };

    const validationSchema = Yup.object().shape({
        location: Yup.string().required('Location is required'),
        date: Yup.string().required('Start date is required'),
        start_time: Yup.string().required('Start time is required'),
        type: Yup.string().required('Search type is required'),
        oic: Yup.string().required('Officer In Charge is required'),
        sm: Yup.string().required('Search Manager is required'),
        so: Yup.string().required('Safety Officer is required'),
        sl: Yup.string().required('Section Leader is required'),
        ro: Yup.string().required('Radio Operator is required'),
        scribe: Yup.string().required('Scribe is required'),
    });

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api({
                method: 'get',
                url: '/users',
            });

            setUsers(response.data);
        } catch (err) {
            if (err.status === 401) {
                console.log('no perms');
                setAuthorized(false);
            }
        }
    };

    const handleSubmit = async (values) => {
        try {
            setLoading(true);

            const response = await api({
                method: 'post',
                url: '/searches',
                data: values,
            });

            if (response.status === 201) {
                setSearchId(response.data.id);
                setCreated(true);
            } else {
                setLoading(false);
                toast.error(response.data.error);
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    };

    if (created) {
        toast.success('Search Record Successfully Created.');
        return (
            <Redirect push to={{
                pathname: `/searches/${searchId}`,
            }}/>
        );
    }

    if (!authorized) {
        return <Redirect push to={{
            pathname: `/searches`,
        }}/>;
    }

    return (
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            {({values, handleBlur, handleChange, errors, touched}) => (
                <Form>
                    <H1>Create New Search Record</H1>
                    <FormGroup>
                        <Label>Search Location</Label>
                        <Input
                            type='text'
                            name='location'
                            placeholder='Search Location'
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormError
                            errors={errors}
                            touched={touched}
                            name={'location'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Start Date</Label>
                        <DatePicker name='startDate' />
                        <FormError
                            errors={errors}
                            touched={touched}
                            name={'date'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Start Time</Label>
                        <Input
                            type='text'
                            name='start_time'
                            value={values.start_time}
                            placeholder='Start Time'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormError
                            errors={errors}
                            touched={touched}
                            name={'start_time'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Search Type</Label>
                        <Input
                            type='select'
                            name='type'
                            value={values.type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option disabled value={''}>Select Search Type</option>
                            <option value='Exercise'>Exercise</option>
                            <option value='Incident'>Incident</option>
                        </Input>
                        <FormError
                            errors={errors}
                            touched={touched}
                            name={'type'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Officer In Charge</Label>
                        <Input
                            type='select'
                            name='oic'
                            value={values.oic}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option disabled value={''}>Select Officer In Charge</option>
                            {users.map((user) => (
                                <option
                                    key={user.uuid}
                                    value={user.first_name + ' ' + user.last_name}
                                >
                                    {user.first_name} {user.last_name}
                                </option>
                            ))}
                        </Input>
                        <FormError
                            errors={errors}
                            touched={touched}
                            name={'oic'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Search Manager</Label>
                        <Input
                            type='select'
                            name='sm'
                            value={values.sm}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option disabled value={''}>Select Search Manager</option>
                            {users.map((user) => (
                                <option
                                    key={user.uuid}
                                    value={user.first_name + ' ' + user.last_name}
                                >
                                    {user.first_name} {user.last_name}
                                </option>
                            ))}
                        </Input>
                        <FormError
                            errors={errors}
                            touched={touched}
                            name={'sm'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Safety Officer</Label>
                        <Input
                            type='select'
                            name='so'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.so}
                        >
                            <option disabled value={''}>Select Safety Officer</option>
                            {users.map((user) => (
                                <option
                                    key={user.uuid}
                                    value={user.first_name + ' ' + user.last_name}
                                >
                                    {user.first_name} {user.last_name}
                                </option>
                            ))}
                        </Input>
                        <FormError
                            errors={errors}
                            touched={touched}
                            name={'so'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Section Leader</Label>
                        <Input
                            type='select'
                            name='sl'
                            value={values.sl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option disabled value={''}>Select Section Leader</option>
                            {users.map((user) => (
                                <option
                                    key={user.uuid}
                                    value={user.first_name + ' ' + user.last_name}
                                >
                                    {user.first_name} {user.last_name}
                                </option>
                            ))}
                        </Input>
                        <FormError
                            errors={errors}
                            touched={touched}
                            name={'sl'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Radio Operator</Label>
                        <Input
                            type='select'
                            name='ro'
                            value={values.ro}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option disabled value={''}>Select Radio Operator</option>
                            {users.map((user) => (
                                <option
                                    key={user.uuid}
                                    value={user.first_name + ' ' + user.last_name}
                                >
                                    {user.first_name} {user.last_name}
                                </option>
                            ))}
                        </Input>
                        <FormError
                            errors={errors}
                            touched={touched}
                            name={'ro'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Scribe</Label>
                        <Input
                            type='select'
                            name='scribe'
                            value={values.scribe}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option disabled value={''}>Select Scribe</option>
                            {users.map((user) => (
                                <option
                                    key={user.uuid}
                                    value={user.first_name + ' ' + user.last_name}
                                >
                                    {user.first_name} {user.last_name}
                                </option>
                            ))}
                        </Input>
                        <FormError
                            errors={errors}
                            touched={touched}
                            name={'scribe'}
                        />
                    </FormGroup>
                    <Button
                        type='submit'
                        block={true}
                        color='primary'
                    >
                        {loading ? 'Loading...' : 'Create Search'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default CreateRecord;
