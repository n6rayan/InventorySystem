import * as config from 'config';
import * as mongoose from 'mongoose';

import { Item } from './models/item';
import { User } from './models/user';

export class Database {
    constructor() {
        const mongooseConfig = config.get('mongoose');
        this._connect(mongooseConfig['connectionString']);
    }

    _connect(connection: string) {
        mongoose.set('useNewUrlParser', true);
        mongoose.connect(connection);
    }

    public fetchItem(id: string) {
        return new Promise((resolve, reject) => {
            Item.findById(id).then(item => {
                resolve(item);
            }).catch(err => {
                reject(err);
            });
        });
    }

    public createItem(itemInfo: object) {
        return new Promise((resolve, reject) => {
            Item.create(itemInfo).then(item => {
                resolve(item)
            }).catch(err => {
                reject(err);
            });
        });
    }

    public fetchUser(id: string) {
        return new Promise((resolve, reject) => {
            User.findById(id).then(user => {
                resolve(user)
            }).catch(err => {
                reject(err);
            });
        });
    }

    public createUser(userInfo: object) {
        return new Promise((resolve, reject) => {
            User.create(userInfo).then(user => {
                resolve(user)
            }).catch(err => {
                reject(err);
            });
        });
    }

    public updateUser(id: string, userInfo: object) {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate(id, userInfo).then(user => {
                resolve(user)
            }).catch(err => {
                reject(err);
            });
        });
    }

    public deleteUser(id: string) {
        return new Promise((resolve, reject) => {
            User.findByIdAndDelete(id).then(user => {
                resolve(user)
            }).catch(err => {
                reject(err);
            });
        });
    }
}
