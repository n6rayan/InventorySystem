import * as mongoose from 'mongoose';

interface User extends mongoose.Document {
    _id: string,
    username: string,
    password: string,
    email: string,
    fullName: string
}

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    fullName: { type: String, required: true }
});

const User = mongoose.model<User>('User', UserSchema);
export { User };