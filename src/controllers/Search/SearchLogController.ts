import {Request, Response} from 'express';

import {ISearchLog} from '@/interfaces/search';
import SearchService from '../../services/SearchService';

const addSearchLog = async (req: Request, res: Response) => {
    let search;

    search = await SearchService.getSearchRecordById(req.params.searchId);

    if (!search) {
        return res.status(404).send();
    }

    const logEntry: ISearchLog = await SearchService.addSearchLogEntry(search._id, req.body);

    return res.status(201).json(logEntry);
};

const getSearchLog = async (req: Request, res: Response) => {
    let search;

    try {
        search = await SearchService.getSearchRecordById(req.params.searchId);
    } catch (e) {
        return res.status(404).send();
    }

    if (!search) {
        return res.status(404).send();
    }

    const logEntries = await SearchService.getSearchLog(search._id);

    return res.json(logEntries);
};

const updateSearchLog = async (req: Request, res: Response) => {
    let logEntry;

    try {
        logEntry = await SearchService.updateSearchLogEntry(req.params.logEntryId, req.body);
    } catch (e) {
        return res.status(404).send();
    }

    return res.status(202).json(logEntry);
};

export default {
    addSearchLog,
    getSearchLog,
    updateSearchLog,
};
