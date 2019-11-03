import {model, Schema} from 'mongoose';

import {ISearchTeam} from '@/interfaces/search';

const SearchTeamSchema = new Schema(
    {
        name: String,
        search: String,
        teamLeader: {
            type: String,
            require: true,
        },
        medic: {
            type: String,
            require: true,
        },
        responder1: String,
        responder2: String,
        responder3: String,
    },
    {
        timestamps: true,
    },
);

export default model<ISearchTeam>('SearchTeam', SearchTeamSchema);
