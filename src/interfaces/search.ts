import {Document} from 'mongoose';
import {ObjectId} from 'mongodb';

export interface ISearchRecord extends Document {
    _id: ObjectId;
    location: string;
    date: Date;
    startTime: string;
    endTime: string;
    type: string;
    oic: string;
    so: string;
    sm: string;
    sl: string;
    ro: string;
    scribe: string;
    searchTeams: any[];
    commsLog: any[];
    searchLog: any[];
    radios: any[];
    notes: string;
}

export interface ICommsLog extends Document {
    _id: ObjectId;
    search: string;
    time: Date;
    callSign: string;
    message: string;
    action: string;
}

export interface ISearchLog extends Document {
    _id: ObjectId;
    search: string;
    team: string;
    area: string;
    startTime: Date;
    endTime: Date;
    notes: string;
}

export interface ISearchTeam extends Document {
    _id: ObjectId;
    name: string;
    search: string;
    teamLeader: string;
    medic: string;
    responder1: string;
    responder2: string;
    responder3: string;
}

export interface IRadioAssignment extends Document {
    _id: ObjectId;
    search: string;
    callSign: string;
    tetraNumber?: number;
    name: string;
}
