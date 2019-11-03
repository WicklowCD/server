import {Request, Response} from 'express';

import {ISearchRecord} from '@/interfaces/search';
import SearchService from '../../services/SearchService';

const store = async (req: Request, res: Response) => {
    const search: ISearchRecord = await SearchService.getSearchRecordById(req.params.searchId);

    if (!search) {
        return res.status(404).send();
    }

    await SearchService.storeRadioAssignment(req.body, search._id);

    return res.status(201).send();
};

const list = async (req: Request, res: Response) => {
    const search: ISearchRecord = await SearchService.getSearchRecordById(req.params.searchId);

    if (!search) {
        return res.status(404).send();
    }

    const radioAssignments = await SearchService.getRadioAssignments(search);

    return res.json(radioAssignments);
};

export default {
    store,
    list,
};
