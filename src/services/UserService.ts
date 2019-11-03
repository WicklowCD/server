import User from '../models/User';
import {IUser} from '@/interfaces/user';

const getAllUsers = async () => {
    return User.find({}, null, {sort: {firstName: 1}}).select(
        '_id firstName lastName email phone role rank firstAid active',
    );
};

const getUserByEmail = async (email: string) => {
    let user;

    try {
        user = User.findOne({email});

        return user;
    } catch (err) {
        throw err;
    }
};

const getUserById = async (userId: string) => {
    let user: any;

    try {
        user = await User.findById(userId).select(
            '_id firstName lastName email phone role rank firstAid active',
        );

        return user;
    } catch (err) {
        throw err;
    }
};

const createUser = async (data) => {
    try {
        const user: IUser = new User(data);
        await user.save();

        return user;
    } catch (err) {
        throw err;
    }
};

const activateUser = async (userId) => {
    try {
        const user: any = await User.findById(userId);
        user.active = true;
        await user.save();
    } catch (err) {
        throw err;
    }
};

const updateUser = async (userId: string, data: any) => {
    const user = await User.findByIdAndUpdate(userId, {$set: data});
    await user.save();

    return user;
};

export default {
    getAllUsers,
    getUserByEmail,
    getUserById,
    createUser,
    activateUser,
    updateUser,
};
