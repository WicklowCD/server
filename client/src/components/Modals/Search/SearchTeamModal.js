import React, {useState, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody, FormGroup, Input, Button, Label} from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import * as Yup from 'yup';
import {Formik, Form} from 'formik';

import FormError from '../../FormError';

const SearchTeamModal = ({isOpen, closeModal, saveTeam, users, searchTeam}) => {
    const [type, setType] = useState('insert');

    const handleSubmit = (values) => {
        saveTeam(values);
    };

    useEffect(() => {
        if (searchTeam) {
            setType('update');
        }
    }, [searchTeam]);

    const initialValues = {
        name: searchTeam ? searchTeam.name : '',
        team_leader: searchTeam ? searchTeam.team_leader : '',
        medic: searchTeam ? searchTeam.medic : '',
        responder_1: searchTeam ? searchTeam.responder_1 : '',
        responder_2: searchTeam ? searchTeam.responder_2 : '',
        responder_3: searchTeam ? searchTeam.responder_3 : '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Team name is required'),
        team_leader: Yup.string().required('Team leader is required'),
        medic: Yup.string().required('Medic is required'),
    });

    const usersArray = users.map((user) => {
        return {
            label: user.first_name + ' ' + user.last_name,
            value: user.first_name + ' ' + user.last_name,
        };
    });

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>{type === 'update' ? 'Update' : 'Add'} Search Team</ModalHeader>
            <ModalBody>
                <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                    {({values, handleBlur, handleChange, errors, touched, setFieldValue}) => (
                        <Form>
                            <FormGroup>
                                <Label>Team Name</Label>
                                <Input
                                    type={'text'}
                                    name={'name'}
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormError
                                    errors={errors}
                                    touched={touched}
                                    name={'name'}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Team Leader</Label>
                                <CreatableSelect
                                    name={'team_leader'}
                                    create={true}
                                    onChange={(option) => setFieldValue('team_leader', option.value)}
                                    onBlur={handleBlur}
                                    options={usersArray}
                                    defaultInputValue={values.team_leader}
                                />
                                <FormError
                                    errors={errors}
                                    touched={touched}
                                    name={'team_leader'}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Medic</Label>
                                <CreatableSelect
                                    name={'medic'}
                                    create={true}
                                    onChange={(option) => setFieldValue('medic', option.value)}
                                    onBlur={handleBlur}
                                    options={usersArray}
                                    defaultInputValue={values.medic}
                                />
                                <FormError
                                    errors={errors}
                                    touched={touched}
                                    name={'medic'}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Responder 1</Label>
                                <CreatableSelect
                                    name={'responder_1'}
                                    create={true}
                                    onChange={(option) => setFieldValue('responder_1', option.value)}
                                    onBlur={handleBlur}
                                    options={usersArray}
                                    defaultInputValue={values.responder_1}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Responder 2</Label>
                                <CreatableSelect
                                    name={'responder_2'}
                                    create={true}
                                    onChange={(option) => setFieldValue('responder_2', option.value)}
                                    onBlur={handleBlur}
                                    options={usersArray}
                                    defaultInputValue={values.responder_2}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Responder 3</Label>
                                <CreatableSelect
                                    name={'responder_3'}
                                    create={true}
                                    onChange={(option) => setFieldValue('responder_3', option.value)}
                                    onBlur={handleBlur}
                                    options={usersArray}
                                    defaultInputValue={values.responder_3}
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

export default SearchTeamModal;
