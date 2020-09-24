import React from 'react';
import {Modal, ModalHeader, ModalBody, FormGroup, Input, Button, Label} from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import * as Yup from 'yup';
import {Formik, Form} from 'formik';

import FormError from '../../FormError';

const RadioAssignmentModal = ({isOpen, closeModal, saveAssignment, users}) => {
    const initialValues = {
        call_sign: '',
        name: '',
        tetra_number: '',
    };

    const validationSchema = Yup.object().shape({
        call_sign: Yup.string().required('Call sign is required'),
        name: Yup.string().required('Name is required'),
    });

    const handleSubmit = (values) => {
        saveAssignment(values);
    };

    const usersArray = users.map((user) => {
        return {
            label: user.first_name + ' ' + user.last_name,
            value: user.first_name + ' ' + user.last_name,
        };
    });

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Add Radio Assignment</ModalHeader>
            <ModalBody>
                <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                    {({values, handleBlur, handleChange, errors, touched, setFieldValue}) => (
                        <Form>
                            <FormGroup>
                                <Label>Call Sign</Label>
                                <Input
                                    type={'text'}
                                    name={'call_sign'}
                                    value={values.call_sign}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                </Input>
                                <FormError
                                    errors={errors}
                                    touched={touched}
                                    name={'call_sign'}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Tetra Number</Label>
                                <Input
                                    type='number'
                                    name='tetra_number'
                                    value={values.tetra_number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormError
                                    errors={errors}
                                    touched={touched}
                                    name={'tetra_number'}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Name</Label>
                                <CreatableSelect
                                    name={'name'}
                                    create={true}
                                    onChange={(option) => setFieldValue('name', option.value)}
                                    onBlur={handleBlur}
                                    options={usersArray}
                                    defaultInputValue={values.name}
                                />
                                <FormError
                                    errors={errors}
                                    touched={touched}
                                    name={'name'}
                                />
                            </FormGroup>
                            <Button onClick={() => closeModal()}>Cancel</Button>
                            &nbsp;
                            <Button type='submit' color='primary'>
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
    );
};

export default RadioAssignmentModal;
