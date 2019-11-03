import {model, Schema} from 'mongoose';

import {IRadioAssignment} from '@/interfaces/search';

const RadioAssignmentSchema = new Schema(
    {
        search: {
            type: Schema.Types.ObjectId,
            ref: 'Search',
        },
        callSign: String,
        tetraNumber: Number,
        name: String,
    },
    {
        timestamps: true,
    },
);

export default model<IRadioAssignment>('Radios', RadioAssignmentSchema);
