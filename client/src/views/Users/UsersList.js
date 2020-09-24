import React, {useState, useEffect} from 'react';
import {Table, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

import api from '../../helpers/Api';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(true);

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api({
                method: 'get',
                url: '/users',
            });

            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            if (err.status === 401 || err.status === 403) {
                setAuthorized(false);
            }
            console.log(err);
        }
    };

    const handleActivateUser = async (user) => {
        const confirmation = window.confirm(
            `Are you sure you wish to activate the account for ${user.firstName} ${
                user.lastName
            }`,
        );
        if (confirmation) {
            const response = await api({
                method: 'post',
                url: `/users/${user.uuid}/activate`,
            });

            if (response.status === 202) {
                await fetchUsers();
            }
        }
    };

    if (!authorized) {
        return <Redirect push to={{
            pathname: `/`,
        }}/>;
    }

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <>
            <h1>Users</h1>
            <div className='table-responsive'>
                <Table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Rank</th>
                        <th>First Aid Level</th>
                        <th>App Role</th>
                        <th>Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.uuid}>
                            <td>
                                <Link to={`/users/${user.uuid}/edit`}>
                                    {user.first_name} {user.last_name}
                                </Link>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.rank}</td>
                            <td>{user.first_aid}</td>
                            <td>{user.app_role}</td>
                            <td>
                                {user.active ? (
                                    'Active'
                                ) : (
                                    <Button
                                        size='sm'
                                        onClick={() => {
                                            handleActivateUser(user);
                                        }}
                                    >
                                        Activate
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default UsersList;
