import React, {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Button, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

import api from '../../helpers/Api';
import SearchDetails from '../../components/Search/SearchDetails';
import SearchLog from '../../components/Search/Logs/SearchLog';
import CommsLog from '../../components/Search/Logs/CommsLog';
import TeamDetails from '../../components/Search/TeamDetails';
import RadioAssignment from '../../components/Search/RadioAssignment';
import EndSearchModal from '../../components/Modals/Search/EndSearchModal';
import {authContext} from '../../contexts/AuthContext';

const SearchRecord = (props) => {
    const searchId = props.location.pathname.split('/')[2];

    const auth = useContext(authContext);
    const user = auth.auth;

    const [search, setSearch] = useState();
    const [searchClosed, setSearchClosed] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchTeams, setSearchTeams] = useState([]);
    const [radioAssignments, setRadioAssignments] = useState([]);
    const [searchLog, setSearchLog] = useState([]);
    const [commsLog, setCommsLog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [showEndSearchModal, setShowEndSearchModal] = useState(false);
    const [activeTab, setActiveTab] = useState('1');

    const fetchSearch = async () => {
        try {
            const response = await api({
                method: 'get',
                url: `/searches/${searchId}`,
            });

            if (response.status === 200) {
                setSearch(response.data);
                setRadioAssignments(response.data.radios);
                setSearchTeams(response.data.teams);
                setCommsLog(response.data.comms_log);
                setSearchLog(response.data.search_log);
                if (response.data.end_time) {
                    setSearchClosed(true);
                }
                setLoading(false);
            } else {
                setSearchNotFound(true);
            }
        } catch (e) {
            console.error(e);
            setSearchNotFound(true);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await api({
                method: 'get',
                url: '/users',
            });

            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const getSearchTeams = async () => {
        const result = await api({
            method: 'get',
            url: `/searches/${searchId}/teams`,
        });

        if (result.status === 200) {
            console.log('data', result.data)
            setSearchTeams(result.data);
        }
    };

    const getSearchLog = async () => {
        const result = await api({
            method: 'get',
            url: `/searches/${searchId}/logs/search`,
        });

        if (result.status === 200) {
            setSearchLog(result.data);
        }

        setLoading(false);
    };

    const getCommsLog = async () => {
        const result = await api({
            method: 'get',
            url: `/searches/${searchId}/logs/comms`,
        });

        if (result.status === 200) {
            setCommsLog(result.data);
        }

        setLoading(false);
    };

    const getRadioAssignments = async () => {
        const result = await api({
            method: 'get',
            url: `/searches/${searchId}/radios`,
        });

        if (result.status === 200) {
            setRadioAssignments(result.data);
        }
    };

    const handleEndSearch = async (data) => {
        const result = await api({
            method: 'post',
            url: `/searches/${searchId}/end`,
            data,
        });

        if (result.status === 202) {
            await fetchSearch();
            toast.success('Search Closed');
            setShowEndSearchModal(false);
        }
    };

    const closeModal = () => {
        setShowEndSearchModal(false);
    };

    useEffect(() => {
        fetchSearch();
        fetchUsers();
        // eslint-disable-next-line
    }, []);

    if (searchNotFound) {
        toast.error('No Search Record Found.');
        return <Redirect push to='/'/>;
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <h1>Search Record</h1>
            <br/>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '1'})}
                        onClick={() => setActiveTab('1')}
                    >
                        Search Details
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '2'})}
                        onClick={() => setActiveTab('2')}
                    >
                        Search Teams
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '3'})}
                        onClick={() => setActiveTab('3')}
                    >
                        Radio Assignment
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '4'})}
                        onClick={() => setActiveTab('4')}
                    >
                        Comms Log
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '5'})}
                        onClick={() => setActiveTab('5')}
                    >
                        Search Log
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                    <SearchDetails search={search} loading={loading}/>
                    <br/>
                    {searchClosed && (
                        <div>
                            <h3>Notes</h3>
                            <hr/>
                            {search.notes}
                            <hr/>
                        </div>
                    )}
                </TabPane>
                <TabPane tabId='2'>
                    <TeamDetails
                        searchId={search.uuid}
                        searchClosed={searchClosed}
                        searchTeams={searchTeams}
                        getSearchTeams={getSearchTeams}
                        users={users}
                    />
                </TabPane>
                <TabPane tabId='3'>
                    <RadioAssignment
                        searchId={search.uuid}
                        searchClosed={searchClosed}
                        getRadioAssignments={getRadioAssignments}
                        radioAssignments={radioAssignments}
                        users={users}
                    />
                </TabPane>
                <TabPane tabId='4'>
                    <CommsLog
                        searchId={search.uuid}
                        searchClosed={searchClosed}
                        commsLog={commsLog}
                        getCommsLog={getCommsLog}
                        radioAssignments={radioAssignments}
                    />
                </TabPane>
                <TabPane tabId='5'>
                    <SearchLog
                        searchId={search.uuid}
                        searchClosed={searchClosed}
                        searchTeams={searchTeams}
                        searchLog={searchLog}
                        getSearchLog={getSearchLog}
                    />
                </TabPane>
            </TabContent>

            {!searchClosed && user.role === 'Admin' &&
            <>
                <br/>
                <br/>
                <Button color='danger' onClick={() => setShowEndSearchModal(true)}>End Search</Button>
            </>}

            {showEndSearchModal && (
                <EndSearchModal
                    isOpen={showEndSearchModal}
                    endSearch={handleEndSearch}
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default SearchRecord;
