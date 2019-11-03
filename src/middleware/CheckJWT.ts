import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';

const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    let jwtPayload;
    const token = req.headers.auth as string;

    try {
        jwtPayload = jwt.verify(token, config.SECRET);
        res.locals.jwtPayload = jwtPayload;
    } catch (err) {
        return res.status(401).send();
    }

    next();
};

export default checkJWT;
