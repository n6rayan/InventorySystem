import * as config from 'config';
import * as mongoose from 'mongoose';

import { Item } from './models/item'

export class Database {
    constructor() {
        const mongooseConfig = config.get('mongoose');

        mongoose.set('useNewUrlParser', true);
        mongoose.connect(mongooseConfig['connectionString']);
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
}