import React from 'react';
import {Modal, ModalHeader, ModalBody, FormGroup, Input, Button, Label} from 'reactstrap';
import {Formik, Form} from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

import FormError from '../../FormError';

const CommsLogModal = ({isOpen, saveLog, closeModal, radioAssignments}) => {
    const initialValues = {
        time: moment().format('HH:mm').toString(),
        call_sign: '',
        message: '',
        action: '',
    };

    const validationSchema = Yup.object().shape({
        time: Yup.string().required('Time is required'),
        call_sign: Yup.string().required('Call sign is required'),
        message: Yup.string().required('Message is required'),
    });

    const handleSubmit = (values) => {
        saveLog(values);
    };

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Add Comms Log Entry</ModalHeader>
            <ModalBody>
                <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                    {({values, handleBlur, handleChange, errors, touched}) => (
                        <Form>
                            <FormGroup>
                                <Label>Time</Label>
                                <Input
                                    type='text'
                                    name={'time'}
                                    value={values.time}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormError
                                    errors={errors}
                                    touched={touched}
                                    name={'time'}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Call Sign</Label>
                                <Input
                                    type='select'
                                    name={'call_sign'}
                                    value={values.call_sign}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option disabled value={''}>Select Call Sign</option>
                                    {radioAssignments.map((assignment) => (
                                        <option
                                            key={assignment.uuid}
                                            value={assignment.call_sign}
                                        >
                                            {assignment.call_sign}
                                        </option>
                                    ))}
                                </Input>
                                <FormError
                                    errors={errors}
                                    touched={touched}
                                    name={'call_sign'}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Message</Label>
                                <Input
                                    type='text'
                                    name={'message'}
                                    value={values.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormError
                                    errors={errors}
                                    touched={touched}
                                    name={'message'}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Action</Label>
                                <Input
                                    type='text'
                                    name={'action'}
                                    value={values.action}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormGroup>
                            <Button type='reset' onClick={() => closeModal()}>
                                Cancel
                            </Button>
                            &nbsp;
                            <Button type='submit' color='primary'>
                                Add Entry
                            </Button>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
    );
};

export default CommsLogModal;
