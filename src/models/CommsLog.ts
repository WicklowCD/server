import {model, Schema} from 'mongoose';

import {ICommsLog} from '@/interfaces/search';

const CommsLogSchema = new Schema(
    {
        search: {
            type: Schema.Types.ObjectId,
            ref: 'Search',
        },
        time: String,
        callSign: String,
        message: String,
        action: String,
    },
    {
        timestamps: true,
    },
);

export default model<ICommsLog>('CommsLog', CommsLogSchema);
