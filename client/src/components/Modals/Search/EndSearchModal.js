import React from 'react';
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {Formik, Form} from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

import FormError from '../../FormError';

const EndSearchModal = ({isOpen, endSearch, closeModal}) => {
    const initialValues = {
        end_time: moment().format('HH:mm').toString(),
        notes: '',
    };

    const validationSchema = Yup.object().shape({
        end_time: Yup.string().required('End Time is required'),
        notes: Yup.string().required('Notes are required'),
    });

    const handleSubmit = (values) => {
        endSearch(values);
    };

    return (
        <div>
            <Modal isOpen={isOpen}>
                <ModalHeader>End Search</ModalHeader>
                <ModalBody>
                    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                        {({values, handleBlur, handleChange, errors, touched}) => (
                            <Form>
                                <FormGroup>
                                    <Label>End Time</Label>
                                    <Input
                                        type={'text'}
                                        name={'end_time'}
                                        value={values.end_time}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FormError
                                        errors={errors}
                                        touched={touched}
                                        name={'end_time'}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Notes</Label>
                                    <Input
                                        type={'textarea'}
                                        name={'notes'}
                                        value={values.notes}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FormError
                                        errors={errors}
                                        touched={touched}
                                        name={'notes'}
                                    />
                                </FormGroup>
                                <Button type='reset' onClick={() => closeModal()}>
                                    Cancel
                                </Button>
                                &nbsp;
                                <Button type='submit' color='danger'>
                                    End Search
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default EndSearchModal;
