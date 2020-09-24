import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Table} from 'reactstrap';

import api from '../../helpers/Api';

const RecordsList = () => {
    const [searchRecords, setSearchRecords] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await api({
                    method: 'get',
                    url: '/searches',
                });

                setSearchRecords(response.data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };

        fetchRecords();
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <>
            <h1>Search Records</h1>
            <div className='table-responsive'>
                <Table>
                    <thead>
                    <tr>
                        <th>Location</th>
                        <th>Start Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {searchRecords.map((record) => (
                        <tr key={record.uuid}>
                            <td>
                                <Link to={`/searches/${record.uuid}`}>{record.location}</Link>
                            </td>
                            <td>{moment(record.date).format('DD/MM/YYYY')}</td>
                            <td>{record.start_time}</td>
                            <td>{record.end_time}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default RecordsList;
