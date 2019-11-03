import request from 'supertest';
import app from '../../src/app';

describe('Basic API Tests', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules(); // this is important - it clears the cache
        process.env = { ...OLD_ENV };
        delete process.env.NODE_ENV;
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    describe('GET /', () => {
        test('returns with success message', async () => {
            const res = await request(app).get('/');

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('API Is Running Properly');
        });

        test('Mongoose throws error if connect fails', async () => {
            process.env.NODE_ENV = 'production';
            process.env.MONGODB_URI = '';
            console.error = jest.fn();

            const updatedApp = require('../../src/app').default;

            await request(updatedApp).get('/');

            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('POST /', () => {
        test('fails with 404', async () => {
            const res = await request(app).post('/');

            expect(res.status).toBe(404);
        });
    });
});
