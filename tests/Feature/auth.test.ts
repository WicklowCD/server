import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';

import User from '../../src/models/User';

describe('Auth Tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    const testUserDetails = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@user.com',
        phone: '+353831234567',
        password: 'test1234',
        passwordConfirm: 'test1234',
    };

    describe('POST /auth/register', () => {
        test('a user can register', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send(testUserDetails);

            expect(res.status).toBe(201);
            expect(res.body.message).toBe(
                'User successfully registered, you will receive an email once your registration is confirmed by an administrator',
            );
        });

        test('passwords must match for a user to register', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({
                    firstName: 'Test',
                    lastName: 'User',
                    email: 'test@user.com',
                    phone: '+353831234567',
                    password: 'test1234',
                    passwordConfirm: 'NotTheSame',
                });

            expect(res.status).toBe(400);
            expect(res.body.error).toBe('password must match passwordConfirm.');
        });

        test('email address must be unique', async () => {
            const user = new User(testUserDetails);
            user.active = true;
            await user.save();

            const res = await request(app)
                .post('/auth/register')
                .send(testUserDetails);

            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Email address is already in use.');
        });
    });

    describe('POST /auth/login', () => {
        test('a user can login when their account is activated', async () => {
            const user = new User(testUserDetails);
            user.active = true;
            await user.save();

            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: testUserDetails.email,
                    password: testUserDetails.password,
                });

            expect(res.status).toBe(200);
            expect(res.body.email).toBe(testUserDetails.email);
            expect(res.body).toHaveProperty('token');
        });

        test('a user can not login if their account is not active', async () => {
            const user = new User(testUserDetails);
            await user.save();

            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: testUserDetails.email,
                    password: testUserDetails.password,
                });

            expect(res.status).toBe(402);
            expect(res.body.error).toBe(
                'This account is not active, please speak to your unit commander.',
            );
        });

        test('a registered and active user can not login if they provide incorrect details', async () => {
            const user = new User(testUserDetails);
            user.active = true;
            await user.save();

            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: testUserDetails.email,
                    password: 'thisIsWrong',
                });

            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Email or password not correct.');
        });

        test('a guest can not login', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: testUserDetails.email,
                    password: testUserDetails.password,
                });

            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Email or password not correct.');
        });
    });
});
