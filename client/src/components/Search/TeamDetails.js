import React, {useState, useContext} from 'react';
import {Table, Button} from 'reactstrap';
import {toast} from 'react-toastify';

import api from '../../helpers/Api';
import SearchTeamModal from '../Modals/Search/SearchTeamModal';
import {authContext} from '../../contexts/AuthContext';

const TeamDetails = ({searchId, searchClosed, searchTeams, getSearchTeams, users}) => {
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [searchTeam, setSearchTeam] = useState();
    const auth = useContext(authContext);
    const user = auth.auth;
    const roles = ['Write', 'Admin'];

    const closeInsertModal = () => {
        setShowInsertModal(false);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const saveSearchTeam = async (data) => {
        console.log('saving', data);
        const result = await api({
            method: 'post',
            url: `/searches/${searchId}/teams`,
            data,
        });

        if (result.status === 201) {
            await getSearchTeams();
            toast.success('Search Team Saved');
            setShowInsertModal(false);
        }
    };

    const updateSearchTeam = async (data) => {
        const result = await api({
            method: 'PUT',
            url: `/searches/${searchId}/teams/${searchTeam.uuid}`,
            data,
        });

        if (result.status === 202) {
            await getSearchTeams();
            toast.success('Search Team Updated');
            setShowUpdateModal(false);
        }
    };

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>Team Name</th>
                    <th>Team Leader</th>
                    <th>Medic</th>
                    <th>Responder 1</th>
                    <th>Responder 2</th>
                    <th>Responder 3</th>
                    {!searchClosed && <th>Update</th>}
                </tr>
                </thead>
                <tbody>
                {searchTeams.map((record) => (
                    <tr key={record.uuid}>
                        <td>{record.name}</td>
                        <td>{record.team_leader}</td>
                        <td>{record.medic}</td>
                        <td>{record.responder_1}</td>
                        <td>{record.responder_2}</td>
                        <td>{record.responder_3}</td>
                        {!searchClosed && roles.includes(user.role) && <td><Button onClick={(e) => {
                            e.preventDefault();
                            setSearchTeam(record);
                            setShowUpdateModal(true);
                        }
                        }>Update Team</Button></td>}
                    </tr>
                ))}
                </tbody>
            </Table>
            <br/>
            {!searchClosed && roles.includes(user.role) &&
            <Button onClick={() => setShowInsertModal(true)}>Add Team</Button>}

            {showInsertModal && (
                <SearchTeamModal
                    isOpen={showInsertModal}
                    closeModal={closeInsertModal}
                    saveTeam={saveSearchTeam}
                    users={users}
                />
            )}

            {showUpdateModal && (
                <SearchTeamModal
                    isOpen={showUpdateModal}
                    closeModal={closeUpdateModal}
                    saveTeam={updateSearchTeam}
                    users={users}
                    searchTeam={searchTeam}
                />
            )}
        </div>
    );
};

export default TeamDetails;
