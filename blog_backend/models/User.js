import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        avatarUrl: { type: String }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('User', UserSchema);