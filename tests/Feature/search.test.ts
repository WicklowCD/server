import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';

import { authUser, createSearch, createUser } from '../helpers';
import Search from '../../src/models/Search';
import User from '../../src/models/User';

describe('Search Tests', () => {
    beforeEach(async () => {
        await Search.deleteMany({});
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    const searchData = {
        type: 'Exercise',
        location: 'location',
        date: new Date(),
        startTime: '20:00',
        oic: 'Officer In Charge',
        so: 'Safety Officer',
        sm: 'Search Manager',
        sl: 'Search Leader',
        ro: 'Radio Operator',
        scribe: 'Scribe',
        commsLog: [],
        searchLog: [],
    };

    const commsLogEntry = {
        time: '2019-07-06 15:19:00',
        callSign: 'W1',
        message: 'Test Message',
        action: 'None',
    };

    const searchLogEntry = {
        team: 1,
        area: 'Along left hand fence for 200m',
        startTime: '20:00',
        endTime: '21:00',
        notes: 'Nothing of interest found',
    };

    describe('POST /search', () => {
        test('a guest can not create a new search', async () => {
            const res = await request(app)
                .post('/search')
                .send(searchData);

            expect(res.status).toBe(401);
            expect(res.body).toStrictEqual({});
        });

        test('a user can create a new search', async () => {
            const token = await authUser();
            const res = await request(app)
                .post('/search')
                .set({ auth: token })
                .send(searchData);

            expect(res.status).toBe(201);
        });
    });

    describe('GET /search', () => {
        test('a guest can not view a list of searches', async () => {
            const res = await request(app).get('/search');

            expect(res.status).toBe(401);
        });

        test('a user can view a list of searches', async () => {
            const token = await authUser();
            await createSearch();
            await createSearch();

            const res = await request(app)
                .get('/search')
                .set({ auth: token });

            expect(res.status).toBe(200);
            expect(res.body.records.length).toEqual(2);
        });
    });

    describe('GET /search/{id}', () => {
        test('a guest can not view a search', async () => {
            const search = await createSearch();

            const res = await request(app).get(`/search/${search._id}`);

            expect(res.status).toBe(401);
            expect(res.body).toStrictEqual({});
        });

        test('a user can view a specific search record', async () => {
            const token = await authUser();
            const search = await createSearch();

            const res = await request(app)
                .get(`/search/${search._id}`)
                .set({ auth: token });

            expect(res.status).toBe(200);
            expect(res.body.type).toBe('Exercise');
        });

        test('throws a 404 if search not found or invalid id passed', async () => {
            const token = await authUser();
            const invalidId = mongoose.Types.ObjectId();

            const res = await request(app)
                .get(`/search/${invalidId}`)
                .set({ auth: token });
            expect(res.status).toBe(404);

            const invalidRes = await request(app)
                .get(`/search/invalidId`)
                .set({ auth: token });
            expect(invalidRes.status).toBe(404);
        });
    });

    describe('POST /search/{id}/logs/comms', () => {
        test('a guest can not create a comms log entry', async () => {
            const search = await createSearch();

            const res = await request(app)
                .post(`/search/${search._id}/logs/comms`)
                .send(commsLogEntry);

            expect(res.status).toBe(401);
            expect(res.body).toStrictEqual({});
        });

        test('a user can create a comms log entry', async () => {
            const token = await authUser();
            const search = await createSearch();

            const res = await request(app)
                .post(`/search/${search._id}/logs/comms`)
                .send(commsLogEntry)
                .set({ auth: token });

            expect(res.status).toBe(201);
        });

        test('can not add comms log to search that does not exist', async () => {
            const token = await authUser();
            const invalidId = mongoose.Types.ObjectId();

            const res = await request(app)
                .post(`/search/${invalidId}/logs/comms`)
                .send(commsLogEntry)
                .set({ auth: token });

            expect(res.status).toBe(404);
        });
    });

    describe('POST /search/{id}/logs/search', () => {
        test('a guest can not create a search log entry', async () => {
            const search = await createSearch();

            const res = await request(app)
                .post(`/search/${search._id}/logs/search`)
                .send(searchLogEntry);

            expect(res.status).toBe(401);
            expect(res.body).toStrictEqual({});
        });

        test('a user can create a search log entry', async () => {
            const token = await authUser();
            const search = await createSearch();

            const res = await request(app)
                .post(`/search/${search._id}/logs/search`)
                .send(searchLogEntry)
                .set({ auth: token });

            expect(res.status).toBe(201);
        });

        test('can not add search log to search that does not exist', async () => {
            const token = await authUser();
            const invalidId = mongoose.Types.ObjectId();

            const res = await request(app)
                .post(`/search/${invalidId}/logs/search`)
                .send(searchLogEntry)
                .set({ auth: token });

            expect(res.status).toBe(404);
        });
    });

    describe('GET /search/{id}/logs/comms', () => {
        test('a guest can not view list of log entries', async () => {
            const token = await authUser();
            const search = await createSearch();
            await request(app)
                .post(`/search/${search._id}/logs/comms`)
                .send(commsLogEntry)
                .set({ auth: token });
            const res = await request(app).get(
                `/search/${search._id}/logs/comms`,
            );

            expect(res.status).toBe(401);
            expect(res.body).toStrictEqual({});
        });

        test('a user can view list of log entries', async () => {
            const token = await authUser();
            const search = await createSearch();
            await request(app)
                .post(`/search/${search._id}/logs/comms`)
                .send(commsLogEntry)
                .set({ auth: token });
            const res = await request(app)
                .get(`/search/${search._id}/logs/comms`)
                .set({ auth: token });

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
        });

        test('can not get comms log entry from a search that does not exist', async () => {
            const token = await authUser();
            const invalidId = mongoose.Types.ObjectId();

            const res = await request(app)
                .get(`/search/${invalidId}/logs/comms`)
                .set({ auth: token });
            expect(res.status).toBe(404);

            const invalidRes = await request(app)
                .get(`/search/invalidId/logs/comms`)
                .set({ auth: token });
            expect(invalidRes.status).toBe(404);
        });
    });

    describe('GET /search/{id}/logs/search', () => {
        test('a user can view search logs', async () => {
            const search = await createSearch();
            const token = await authUser();

            const res = await request(app)
                .get(`/search/${search._id}/logs/search`)
                .set({ auth: token });

            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
        });

        test('a guest can not view search logs', async () => {
            const search = await createSearch();

            const res = await request(app).get(
                `/search/${search._id}/logs/search`,
            );

            expect(res.status).toBe(401);
            expect(res.body).toStrictEqual({});
        });

        test('can not get search log entry from a search that does not exist', async () => {
            const token = await authUser();
            const invalidId = mongoose.Types.ObjectId();

            const res = await request(app)
                .get(`/search/${invalidId}/logs/search`)
                .set({ auth: token });
            expect(res.status).toBe(404);

            const invalidRes = await request(app)
                .get(`/search/invalidId/logs/search`)
                .set({ auth: token });
            expect(invalidRes.status).toBe(404);
        });
    });

    describe('PUT /search/{searchId}/logs/search/{logEntryId}', () => {
        test('a user can update a search log', async () => {
            const token = await authUser();
            const search = await createSearch();
            const logRes = await request(app)
                .post(`/search/${search._id}/logs/search`)
                .send(searchLogEntry)
                .set({ auth: token });

            searchLogEntry.endTime = '22:00';

            const updatedLogEntry = searchLogEntry;
            updatedLogEntry.endTime = '22:00';

            const res = await request(app)
                .put(`/search/${search._id}/logs/search/${logRes.body._id}`)
                .send(updatedLogEntry)
                .set({ auth: token });

            expect(res.status).toBe(202);
            expect(res.body.endTime).toBe('22:00');
        });
    });

    describe('POST /search/{id}/teams', () => {
        test('a user can create a search team', async () => {
            const token = await authUser();
            const search = await createSearch();
            const teamLeader = await createUser();
            const medic = await createUser();
            const responder1 = await createUser();
            const responder2 = await createUser();
            const responder3 = await createUser();

            const res = await request(app)
                .post(`/search/${search._id}/teams`)
                .send({
                    name: 'Team 1',
                    teamLeader: teamLeader.firstName + ' ' + teamLeader.lastName,
                    medic: medic.firstName + ' ' + medic.lastName,
                    responder1: responder1.firstName + ' ' + responder1.lastName,
                    responder2: responder2.firstName + ' ' + responder2.lastName,
                    responder3: responder3.firstName + ' ' + responder3.lastName,
                })
                .set({ auth: token });

            expect(res.status).toBe(201);
        });
    });
});
