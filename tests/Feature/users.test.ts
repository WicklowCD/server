import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';
import User from '../../src/models/User';
import { createUser, authUser } from '../helpers';

describe('Users Tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /users', () => {
        afterEach(async () => {
            await User.deleteMany({});
        });

        test('a guest can not view users', async () => {
            const res = await request(app).get('/users');

            expect(res.status).toBe(401);
        });

        test('returns a list of users', async () => {
            const token = await authUser();
            await createUser();
            await createUser();
            await createUser();
            await createUser();

            const res = await request(app)
                .get('/users')
                .set({ auth: token });

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(5);
        });
    });

    describe('POST /users', () => {
        test('a guest can not create a new user', async () => {
            const userData = {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@user.com',
                phone: '+353831234567',
                password: 'test1234',
                passwordConfirm: 'test1234',
            };
            const res = await request(app)
                .post('/users')
                .send(userData);

            expect(res.status).toBe(401);
        });

        test('a user can create a new user', async () => {
            const token = await authUser();
            const userData = {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@user.com',
                phone: '+353831234567',
                password: 'test1234',
                passwordConfirm: 'test1234',
            };

            const res = await request(app)
                .post('/users')
                .set({ auth: token })
                .send(userData);

            expect(res.status).toBe(201);
        });

        test('passwords must match when creating a new user', async () => {
            const token = await authUser();
            const userData = {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@user.com',
                phone: '+353831234567',
                password: 'test1234',
                passwordConfirm: 'NotTheSame',
            };

            const res = await request(app)
                .post('/users')
                .set({ auth: token })
                .send(userData);

            expect(res.status).toBe(400);
            expect(res.body.error).toBe('password must match passwordConfirm.');
        });

        test('email address must be unique', async () => {
            const token = await authUser();
            const userData = {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@user.com',
                phone: '+353831234567',
                password: 'test1234',
                passwordConfirm: 'test1234',
            };

            await request(app)
                .post('/users')
                .set({ auth: token })
                .send(userData);
            const res = await request(app)
                .post('/users')
                .set({ auth: token })
                .send(userData);

            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Email address is already in use.');
        });
    });
});
