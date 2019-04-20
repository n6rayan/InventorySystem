import { Document, Schema, model } from 'mongoose';

interface User extends Document {
    _id: string,
    username: string,
    password: string,
    email: string,
    fullName: string
}

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    fullName: { type: String, required: true }
});

const User = model<User>('User', UserSchema);
export { User };