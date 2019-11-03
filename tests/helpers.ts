import faker from 'faker';
import jwt from 'jsonwebtoken';
import config from '../src/config';
import { IJwtPayload } from '../src/interfaces/auth';
import Search from '../src/models/Search';

import User from '../src/models/User';

export const createUser = async () => {
    const user = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        password: 'test1234',
        active: true,
    });

    await user.save();

    return {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        active: user.active,
    };
};

export const createSearch = async () => {
    const search = new Search({
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
    });

    await search.save();

    return search;
};

export const authUser = async () => {
    const user = await createUser();

    const payload: IJwtPayload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
    };

    return await jwt.sign(payload, config.SECRET);
};
