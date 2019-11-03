import {Request, Response} from 'express';

import SearchService from '../../services/SearchService';
import {ISearchRecord} from '@/interfaces/search';

const list = async (req: Request, res: Response): Promise<Response> => {
    const searchRecords = await SearchService.getAllSearches();

    return res.json({records: searchRecords});
};

const create = async (req: Request, res: Response): Promise<Response> => {
    const searchRecord: ISearchRecord = await SearchService.createSearch(req.body);

    return res.status(201).json({id: searchRecord._id});
};

const show = async (req: Request, res: Response): Promise<Response> => {
    let search;

    try {
        search = await SearchService.getSearchRecord(req.params.searchId);
    } catch (e) {
        return res.status(404).send();
    }

    if (!search) {
        return res.status(404).send();
    }

    return res.json(search);
};

const endSearch = async (req: Request, res: Response): Promise<Response> => {
    await SearchService.closeSearch(req.params.searchId, req.body.endTime, req.body.notes);

    return res.status(204).send();
};

export default {
    create,
    list,
    show,
    endSearch,
};
