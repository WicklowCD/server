describe('Config Tests', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules(); // this is important - it clears the cache
        process.env = { ...OLD_ENV };
        delete process.env.NODE_ENV;
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    test('uses test db in test mode', () => {
        process.env.NODE_ENV = 'test';

        const config = require('../../src/config').default;
        expect(config.MONGODB_URI).toBe(
            'mongodb://127.0.0.1:27017/wwcd-test',
        );
    });

    test('uses dev db in dev mode', () => {
        process.env.NODE_ENV = 'dev';

        const config = require('../../src/config').default;
        expect(config.MONGODB_URI).toBe(
            'mongodb://127.0.0.1:27017/wwcd',
        );
    });

    test('pulls db from process.env when set', () => {
        process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/prod';
        process.env.NODE_ENV = 'production';

        const config = require('../../src/config').default;
        expect(config.MONGODB_URI).toBe('mongodb://127.0.0.1:27017/prod');
    });

    test('salt uses 12 rounds in production', () => {
        process.env.NODE_ENV = 'production';

        const config = require('../../src/config').default;
        expect(config.SALT_ROUNDS).toBe(12);
    });

    test('salt uses 4 rounds in test', () => {
        process.env.NODE_ENV = 'test';

        const config = require('../../src/config').default;
        expect(config.SALT_ROUNDS).toBe(4);
    });

    test('uses secret from env in production', () => {
        process.env.NODE_ENV = 'production';
        process.env.SECRET = 'ThisIsTheSecretFromTheENV';

        const config = require('../../src/config').default;
        expect(config.SECRET).toBe('ThisIsTheSecretFromTheENV');
    });

    test('uses default secret in dev', () => {
        process.env.NODE_ENV = 'dev';

        const config = require('../../src/config').default;
        expect(config.SECRET).toBe('notSoSecureAreWe?');
    });
});
