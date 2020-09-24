import React from 'react';
import moment from 'moment';
import {Table} from 'reactstrap';

const SearchDetails = ({search, loading}) => {
    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>Location</th>
                    <th>Incident Type</th>
                    <th>Start Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{search.location}</td>
                    <td>{search.type}</td>
                    <td>{moment(search.date).format('DD/MM/YYYY')}</td>
                    <td>{search.start_time}</td>
                    <td>{search.end_time}</td>
                </tr>
                </tbody>
            </Table>
            <Table>
                <thead>
                <tr>
                    <th>Officer In Charge</th>
                    <th>Safety Officer</th>
                    <th>Search Manager</th>
                    <th>Section Leader</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{search.oic}</td>
                    <td>{search.so}</td>
                    <td>{search.sm}</td>
                    <td>{search.sl}</td>
                </tr>
                </tbody>
            </Table>
            <Table>
                <thead>
                <tr>
                    <th>Scribe</th>
                    <th>Radio Operator</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{search.scribe}</td>
                    <td>{search.ro}</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default SearchDetails;
