import {Request, Response} from 'express';

import UserService from '../services/UserService';

const createUser = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.password !== req.body.passwordConfirm) {
        return res
            .status(400)
            .json({error: 'password must match passwordConfirm.'});
    }

    const existingUser = await UserService.getUserByEmail(req.body.email);

    if (existingUser) {
        return res
            .status(400)
            .json({error: 'Email address is already in use.'});
    }

    await UserService.createUser(req.body);

    return res.status(201).send();
};

const listAllUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await UserService.getAllUsers();

    return res.json(users);
};

const getUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await UserService.getUserById(req.params.userId);

    return res.json(user);
};

const activateUser = async (req: Request, res: Response): Promise<Response> => {
    await UserService.activateUser(req.params.userId);

    return res.status(202).send();
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await UserService.updateUser(req.params.userId, req.body);

    return res.status(202).json(user);
};

export default {
    createUser,
    listAllUsers,
    getUser,
    activateUser,
    updateUser,
};
