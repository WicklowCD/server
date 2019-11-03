import {ICommsLog, ISearchLog, ISearchRecord, ISearchTeam, IRadioAssignment} from '@/interfaces/search';
import Search from '../models/Search';
import CommsLog from '../models/CommsLog';
import SearchLog from '../models/SearchLog';
import SearchTeam from '../models/SearchTeam';
import RadioAssignment from '../models/RadioAssignment';

const getAllSearches = async (): Promise<ISearchRecord[]> => {
    return Search.find();
};

const getSearchRecord = async (searchId): Promise<ISearchRecord> => {
    const search: ISearchRecord = await getSearchRecordById(searchId);
    search.radios = await getRadioAssignments(search);
    search.commsLog = await getCommsLog(searchId);
    search.searchTeams = await getSearchTeams(search);
    search.searchLog = await getSearchLog(searchId);

    return search;
};

const createSearch = async (data): Promise<ISearchRecord> => {
    const search = new Search(data);
    await search.save();
    return search;
};

const closeSearch = async (searchId, endTime, notes): Promise<boolean> => {
    const search = await getSearchRecordById(searchId);
    search.endTime = endTime;
    search.notes = notes;
    await search.save();

    return true;
};

const addCommsLogEntry = async (searchId, data): Promise<ICommsLog> => {
    const search = await getSearchRecordById(searchId);
    const logEntry = new CommsLog(data);
    logEntry.search = searchId;
    await logEntry.save();

    search.commsLog.push(logEntry._id);
    await search.save();

    return logEntry;
};

const getCommsLog = async (searchId): Promise<ICommsLog[]> => {
    const search = await getSearchRecordById(searchId);
    return await CommsLog.find({})
        .where('_id')
        .in(search.commsLog)
        .exec();
};

const addSearchLogEntry = async (searchId, data): Promise<ISearchLog> => {
    const search = await getSearchRecordById(searchId);
    const logEntry = new SearchLog(data);
    logEntry.search = searchId;
    await logEntry.save();

    search.searchLog.push(logEntry._id);
    await search.save();

    return logEntry;
};

const getSearchLog = async (searchId): Promise<ISearchLog[]> => {
    const search = await getSearchRecordById(searchId);
    return await SearchLog.find({})
        .where('_id')
        .in(search.searchLog)
        .exec();
};

const updateSearchLogEntry = async (logEntryId, data): Promise<ISearchLog> => {
    return SearchLog.findByIdAndUpdate(
        logEntryId,
        data,
        {new: true},
    );
};

const createSearchTeam = async (data, searchId): Promise<ISearchTeam> => {
    const search = await getSearchRecordById(searchId);
    const searchTeam: ISearchTeam = new SearchTeam(data);
    searchTeam.search = searchId;
    await searchTeam.save();

    search.searchTeams.push(searchTeam._id);
    await search.save();

    return searchTeam;
};

const getSearchTeams = async (search: ISearchRecord): Promise<ISearchTeam[]> => {
    return await SearchTeam.find({}).where('_id').in(search.searchTeams).exec();
};

const updateSearchTeam = async (searchTeamId, data): Promise<ISearchTeam> => {
    return SearchTeam.findByIdAndUpdate(searchTeamId, data, {new: true});
};

const storeRadioAssignment = async (data, searchId): Promise<boolean> => {
    const search = await getSearchRecordById(searchId);
    const radioAssignment: IRadioAssignment = new RadioAssignment(data);
    radioAssignment.search = searchId;
    await radioAssignment.save();

    search.radios.push(radioAssignment._id);
    await search.save();

    return true;
};

const getRadioAssignments = async (search: ISearchRecord): Promise<IRadioAssignment[]> => {
    return await RadioAssignment.find({}).where('_id').in(search.radios).exec();
};

const getSearchRecordById = async (searchId): Promise<ISearchRecord> => {
    return Search.findById(searchId);
};

export default {
    getAllSearches,
    createSearch,
    getSearchRecordById,
    getSearchRecord,
    closeSearch,
    addCommsLogEntry,
    getCommsLog,
    addSearchLogEntry,
    getSearchLog,
    updateSearchLogEntry,
    createSearchTeam,
    getSearchTeams,
    updateSearchTeam,
    storeRadioAssignment,
    getRadioAssignments,
};
