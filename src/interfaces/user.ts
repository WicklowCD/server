import {Document} from 'mongoose';
import {ObjectId} from 'mongodb';

export interface IUser extends Document {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    active: boolean;
    rank: string;
    firstAid: string;

    comparePassword(candidatePassword: string): Promise<boolean>;
}
