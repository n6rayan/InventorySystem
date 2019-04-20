import * as config from 'config';
import * as mongoose from 'mongoose';

import * as item from './models/item'

export class Database {
    constructor() {
        const mongooseConfig = config.get('mongoose');

        mongoose.set('useNewUrlParser', true);
        mongoose.connect(mongooseConfig['connectionString']);
    }

    public getItem(id: string) {
        return new Promise((resolve, reject) => {
            item.default.findById(id)
            .then(item => resolve(item))
            .catch(err => reject(err));
        });
    }

    public insertItem(itemInfo: object) {
        return new Promise((resolve, reject) => {
            item.default.create(itemInfo)
            .then(item => resolve(item))
            .catch(err => reject(err));
        });
    }

    public updateItem(id: string, itemInfo: object) {
        return new Promise((resolve, reject) => {
            item.default.findByIdAndUpdate(id, itemInfo)
            .then(item => resolve(item))
            .catch(err => reject(err));
        });
    }

    public deleteItem(id: string) {
        return new Promise((resolve, reject) => {
            item.default.findByIdAndDelete(id)
            .then(item => resolve(item))
            .catch(err => reject(err));
        });
    }
}