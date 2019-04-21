import { expect } from 'chai';
import MongoMemoryServer from 'mongodb-memory-server';

import { Database } from '../src/database/database';

const db = new Database();
let mongod: MongoMemoryServer;

before((done) => {
    mongod = new MongoMemoryServer();
    mongod.getConnectionString().then(mongoUri => {
        db._connect(mongoUri);
    });

    done();
});

after(() => {
    mongod.stop();
});

const itemData = {
    itemName: 'Milk',
    description: 'A carton of Milk.',
    price: 0.99
};

describe('Items Test', () => {
    let itemId: string;

    it('should create an item', async () => {
        const createItem = await db.createItem(itemData);
        itemId = createItem['id'];

        expect(createItem).to.be.an('object');
        expect(createItem['id']).to.be.string;
        expect(createItem['itemName']).to.equal('Milk');
    });

    it('should fetch an item', async () => {
        const fetchItem = await db.fetchItem(itemId);

        expect(fetchItem['itemName']).to.equal('Milk');
        expect(fetchItem['description']).to.equal('A carton of Milk.');
        expect(fetchItem['price']).to.equal(0.99);
    });

    it('should update an item', async () => {
        const updateItemData = {
            itemName: 'Cheese',
            description: 'A block of cheese.'
        };
        const updateItem = await db.updateItem(itemId, updateItemData);

        expect(updateItem['itemName']).to.equal('Cheese');
        expect(updateItem['description']).to.equal('A block of cheese.');
        expect(updateItem['price']).to.equal(0.99);
    });

    it('should delete an item', async () => {
        const deleteItem = await db.deleteItem(itemId);

        expect(deleteItem['id']).to.equal(itemId);
    });
});