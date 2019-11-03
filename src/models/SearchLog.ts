import {model, Schema} from 'mongoose';

import {ISearchLog} from '@/interfaces/search';

const SearchLogSchema = new Schema(
    {
        search: {
            type: Schema.Types.ObjectId,
            ref: 'Search',
        },
        team: String,
        area: String,
        startTime: String,
        endTime: String,
        notes: String,
    },
    {
        timestamps: true,
    },
);

export default model<ISearchLog>('SearchLog', SearchLogSchema);
