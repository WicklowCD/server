import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI =
    process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URI
        : process.env.NODE_ENV === 'test'
        ? 'mongodb://127.0.0.1:27017/wwcd-test'
        : 'mongodb://127.0.0.1:27017/wwcd';
const SALT_ROUNDS = process.env.NODE_ENV === 'production' ? 12 : 4;
const SECRET = process.env.SECRET || 'notSoSecureAreWe?';

export default {
    MONGODB_URI,
    SALT_ROUNDS,
    SECRET,
};
