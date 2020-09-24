import React, {useState, useContext} from 'react';
import {Table, Button} from 'reactstrap';
import {toast} from 'react-toastify';

import api from '../../../helpers/Api';
import CommsLogModal from '../../Modals/Search/CommsLogModal';
import {authContext} from '../../../contexts/AuthContext';

const CommsLog = ({searchId, searchClosed, commsLog, getCommsLog, radioAssignments}) => {
    const [showModal, setShowModal] = useState(false);
    const auth = useContext(authContext);
    const user = auth.auth;
    const roles = ['Write', 'Admin'];

    const insertCommsLogEntry = async (data) => {
        const result = await api({
            method: 'post',
            url: `/searches/${searchId}/logs/comms`,
            data,
        });

        if (result.status === 201) {
            await getCommsLog();
            toast.success('Log entry saved');
            setShowModal(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>Time</th>
                    <th>Call Sign</th>
                    <th>Message</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {commsLog.map((record) => (
                    <tr key={record.uuid}>
                        <td>{record.time}</td>
                        <td>{record.call_sign}</td>
                        <td>{record.message}</td>
                        <td>{record.action}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <br/>
            {!searchClosed && roles.includes(user.role) &&
            <Button onClick={() => setShowModal(true)}>Add Comms Log</Button>}

            {showModal && (
                <CommsLogModal
                    isOpen={showModal}
                    saveLog={insertCommsLogEntry}
                    closeModal={closeModal}
                    radioAssignments={radioAssignments}
                />
            )}
        </div>
    );
};

export default CommsLog;
