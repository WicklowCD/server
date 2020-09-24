import React, {useState, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody, FormGroup, Input, Button, Label} from 'reactstrap';
import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import moment from 'moment';

import FormError from '../../FormError';

const SearchLogModal = ({isOpen, closeModal, searchLogEntry, saveLog, teams}) => {
    const [type, setType] = useState('insert');

    useEffect(() => {
        if (searchLogEntry) {
            setType('update');
        }
    }, [searchLogEntry]);

    const initialValues = {
        type: searchLogEntry ? 'update' : 'insert',
        team: searchLogEntry ? searchLogEntry.team : '',
        area: searchLogEntry ? searchLogEntry.area : '',
        start_time: searchLogEntry ? searchLogEntry.start_time : moment().format('HH:mm').toString(),
        end_time: searchLogEntry ? searchLogEntry.end_time : '',
        notes: searchLogEntry ? searchLogEntry.notes : '',
    };

    const validationSchema = Yup.object().shape({
        team: Yup.string().required('Team is required'),
        area: Yup.string().required('Search area is required'),
        start_time: Yup.string().required('Start time is required'),
    });

    const handleSubmit = (values) => {
        saveLog(values);
    };

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>{type === 'update' ? 'Update' : 'Add'} Search Log Entry</ModalHeader>
            <ModalBody>
                <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                    {({values, handleBlur, handleChange, errors, touched}) => (
                        <Form method='POST'>
                            <FormGroup>
                                <Label>Search Team</Label>
                                <Input
                                    type={'select'}
                                    name={'team'}
                                    value={values.team}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option disabled value={''}>Select Search Team</option>
                                    {teams.map((team) => (
                                        <option
                                            key={team.uuid}
                                            value={team.name}
                                        >
                                            {team.name}
                                        </option>
                                    ))}
                                </Input>
                                <FormError
                                    errors={errors}
                                    touched={touched}
                                    name={'team'}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Area</Label>
                                <Input
                                    type={'text'}
                                    name={'area'}
                                    value={values.area}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormError
                                    errors={errors}
                                    touched={touched}
                                    name={'area'}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Start Time</Label>
                                <Input
                                    type={'text'}
                                    name={'start_time'}
                                    value={values.start_time}
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
                                <Label>Finish Time</Label>
                                <Input
                                    type={'text'}
                                    name={'end_time'}
                                    value={values.end_time}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Notes</Label>
                                <Input
                                    type={'text'}
                                    name={'notes'}
                                    value={values.notes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormGroup>
                            <Button onClick={() => closeModal()}>Cancel</Button>
                            &nbsp;
                            <Button type='submit' color='primary'>
                                {type === 'update' ? 'Update Entry' : 'Add Entry'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
    );
};

export default SearchLogModal;
