import {model, Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

import config from '../config';
import {IUser} from '@/interfaces/user';

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        phone: String,
        rank: {
            type: String,
            enum: ['Volunteer', 'Assistant Section Leader', 'Section Leader', 'Third Officer', 'Second Officer', 'First Officer', 'Commander', 'Civil Defence Officer'],
            default: 'Volunteer',
        },
        firstAid: {
            type: String,
            enum: ['CFR', 'FAR', 'EFR', 'EMT', 'Paramedic', 'Doctor'],
            default: 'CFR',
        },
        role: {
            type: String,
            enum: ['Read', 'Write', 'Admin'],
            default: 'Read',
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function(next) {
    const user = this as any;

    if (user.password && this.isModified('password')) {
        const salt = bcrypt.genSaltSync(config.SALT_ROUNDS);
        user.password = bcrypt.hashSync(user.password, salt);
    }

    next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

export default model<IUser>('User', userSchema);
