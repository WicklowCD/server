import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import config from '../config';
import {IJwtPayload} from '@/interfaces/auth';

const login = async (req: Request, res: Response) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res
            .status(400)
            .json({error: 'Email or password not correct.'});
    }

    if (!user.comparePassword(req.body.password)) {
        return res
            .status(400)
            .json({error: 'Email or password not correct.'});
    }

    if (!user.active) {
        return res.status(402).json({
            error:
                'This account is not active, please speak to your unit commander.',
        });
    }

    const payload: IJwtPayload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
    };

    const token = await jwt.sign(payload, config.SECRET);

    return res.json({email: user.email, token});
};

const register = async (req: Request, res: Response) => {
    if (req.body.password !== req.body.passwordConfirm) {
        return res
            .status(400)
            .json({error: 'password must match passwordConfirm.'});
    }

    const existingUser = await User.findOne({email: req.body.email});

    if (existingUser) {
        return res
            .status(400)
            .json({error: 'Email address is already in use.'});
    }

    const user = new User(req.body);
    await user.save();
    return res.status(201).json({
        message:
            'User successfully registered, you will receive an email once your registration is confirmed by an administrator',
    });
};

export default {
    login,
    register,
};
