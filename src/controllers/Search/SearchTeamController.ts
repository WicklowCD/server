import {Request, Response} from 'express';

import {ISearchTeam, ISearchRecord} from '@/interfaces/search';
import SearchService from '../../services/SearchService';

const create = async (req: Request, res: Response) => {
    const search: ISearchRecord = await SearchService.getSearchRecordById(req.params.searchId);

    if (!search) {
        return res.status(404).send();
    }

    const searchTeam: ISearchTeam = await SearchService.createSearchTeam(req.body, search._id);

    return res.status(201).json(searchTeam);
};

const getSearchTeams = async (req: Request, res: Response) => {
    const search: ISearchRecord = await SearchService.getSearchRecordById(req.params.searchId);

    if (!search) {
        return res.status(404).send();
    }

    const teams = await SearchService.getSearchTeams(search);

    return res.json(teams);
};

const updateSearchTeam = async (req: Request, res: Response): Promise<Response> => {
    let searchTeam: ISearchTeam;

    try {
        searchTeam = await SearchService.updateSearchTeam(req.params.searchTeamId, req.body);
    } catch (e) {
        return res.status(404).send();
    }

    return res.status(202).json(searchTeam);
};

export default {
    create,
    getSearchTeams,
    updateSearchTeam,
};
