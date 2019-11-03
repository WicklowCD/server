import {model, Schema} from 'mongoose';

import {ISearchRecord} from '@/interfaces/search';

const SearchSchema = new Schema(
    {
        location: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
        },
        type: {
            type: String,
            enum: ['Incident', 'Exercise'],
            default: 'Exercise',
        },
        oic: String,
        so: String,
        sm: String,
        sl: String,
        ro: String,
        scribe: String,
        commsLog: Array,
        searchLog: Array,
        searchTeams: Array,
        osuTeam: Object,
        radios: Array,
        notes: String,
    },
    {
        timestamps: true,
    },
);

export default model<ISearchRecord>('Search', SearchSchema);
