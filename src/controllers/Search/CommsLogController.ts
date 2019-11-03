import {Request, Response} from 'express';

import {ICommsLog} from '@/interfaces/search';
import SearchService from '../../services/SearchService';

const addCommsLog = async (req: Request, res: Response) => {
    let search;

    search = await SearchService.getSearchRecordById(req.params.searchId);

    if (!search) {
        return res.status(404).send();
    }

    const logEntry: ICommsLog = await SearchService.addCommsLogEntry(req.params.searchId, req.body);

    return res.status(201).json(logEntry);
};

const getCommsLog = async (req: Request, res: Response) => {
    let search;

    try {
        search = await SearchService.getSearchRecordById(req.params.searchId);
    } catch (e) {
        return res.status(404).send();
    }

    if (!search) {
        return res.status(404).send();
    }

    const logEntries = await SearchService.getCommsLog(search._id);

    return res.json(logEntries);
};

export default {
    addCommsLog,
    getCommsLog,
};
