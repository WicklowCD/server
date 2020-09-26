import React, {useState, useContext} from 'react';
import {Table, Button} from 'reactstrap';
import {toast} from 'react-toastify';

import api from '../../helpers/Api';
import {authContext} from '../../contexts/AuthContext';
import RadioAssignmentModal from '../Modals/Search/RadioAssignmentModal';

const RadioAssignment = ({searchClosed, searchId, getRadioAssignments, radioAssignments, users}) => {
    const [showInsertModal, setShowInsertModal] = useState(false);
    const auth = useContext(authContext);
    const user = auth.auth;
    const roles = ['Write', 'Admin'];

    const closeInsertModal = () => {
        setShowInsertModal(false);
    };

    const saveAssignment = async (data) => {
        const result = await api({
            method: 'post',
            url: `/searches/${searchId}/radios`,
            data,
        });

        if (result.status === 201) {
            toast.success('Radio Assignment Saved');
            getRadioAssignments();
            setShowInsertModal(false);
        }
    };

    return (
        <>
            <Table>
                <thead>
                <tr>
                    <th>Call Sign</th>
                    <th>Tetra Number</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {radioAssignments.map((assignment) => (
                    <tr key={assignment.uuid}>
                        <td>{assignment.call_sign}</td>
                        <td>{assignment.tetra_number}</td>
                        <td>{assignment.name}</td>
                    </tr>
                ))}
                </tbody>

            </Table>
            <br/>
            {!searchClosed && roles.includes(user.role) &&
            <Button onClick={() => setShowInsertModal(true)}>Add Radio Assignment</Button>}

            {showInsertModal && (
                <RadioAssignmentModal
                    isOpen={showInsertModal}
                    closeModal={closeInsertModal}
                    saveAssignment={saveAssignment}
                    users={users}
                />
            )}
        </>
    );
};

export default RadioAssignment;
