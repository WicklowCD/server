import React, {useState, useContext} from 'react';
import {Table, Button} from 'reactstrap';
import {toast} from 'react-toastify';

import api from '../../../helpers/Api';
import SearchLogModal from '../../Modals/Search/SearchLogModal';
import {authContext} from '../../../contexts/AuthContext';

const SearchLog = ({searchId, searchClosed, searchTeams, searchLog, getSearchLog}) => {
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [searchLogEntry, setSearchLogEntry] = useState();
    const auth = useContext(authContext);
    const user = auth.auth;
    const roles = ['Write', 'Admin'];

    const closeInsertModal = () => {
        setShowInsertModal(false);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const insertSearchLogEntry = async (data) => {
        const result = await api({
            method: 'post',
            url: `/searches/${searchId}/logs/search`,
            data,
        });

        if (result.status === 201) {
            await getSearchLog();
            toast.success('Log entry saved');
            setShowInsertModal(false);
        }
    };

    const updateSearchLogEntry = async (data) => {
        const result = await api({
            method: 'put',
            url: `/searches/${searchId}/logs/search/${searchLogEntry.uuid}`,
            data,
        });

        if (result.status === 202) {
            await getSearchLog();
            toast.success('Log entry updated');
            setShowUpdateModal(false);
        }
    };

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>Team</th>
                    <th>Search Area / Location</th>
                    <th>Start Time</th>
                    <th>Finish Time</th>
                    <th>Notes</th>
                    {!searchClosed && <th>Update</th>}
                </tr>
                </thead>
                <tbody>
                {searchLog.map((record) => (
                    <tr key={record.uuid}>
                        <td>{record.team}</td>
                        <td>{record.area}</td>
                        <td>{record.start_time}</td>
                        <td>{record.end_time}</td>
                        <td>{record.notes}</td>
                        <td>
                            {!searchClosed && roles.includes(user.role) && (
                                <Button
                                    size={'small'}
                                    onClick={((e) => {
                                        e.preventDefault();
                                        setSearchLogEntry(record);
                                        setShowUpdateModal(true);
                                    })}
                                >
                                    Update
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <br/>
            {!searchClosed && roles.includes(user.role) &&
            <Button onClick={() => setShowInsertModal(true)}>Add Search Log</Button>}

            {showInsertModal && (
                <SearchLogModal
                    isOpen={showInsertModal}
                    closeModal={closeInsertModal}
                    saveLog={insertSearchLogEntry}
                    teams={searchTeams}
                />
            )}

            {showUpdateModal && (
                <SearchLogModal
                    isOpen={showUpdateModal}
                    closeModal={closeUpdateModal}
                    searchLogEntry={searchLogEntry}
                    saveLog={updateSearchLogEntry}
                    teams={searchTeams}
                />
            )}
        </div>
    );
};

export default SearchLog;
