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

const userData = {
    username: 'username',
    password: 'password',
    email: 'email@fake-email.com',
    fullName: 'User Name'
};

describe('Users Test', () => {
    let userId: string;

    it('should create a user', async () => {
        const createUser = await db.createUser(userData);
        userId = createUser['id'];

        expect(createUser).to.be.an('object');
        expect(createUser['id']).to.be.string;
        expect(createUser['email']).to.equal('email@fake-email.com');
    });

    it('should fetch a user', async () => {
        const fetchUser = await db.fetchUser(userId);

        expect(fetchUser['username']).to.equal('username');
        expect(fetchUser['password']).to.equal('password');
        expect(fetchUser['fullName']).to.equal('User Name');
    });

    it('should update a user', async () => {
        const updateUserData = {
            username: 'u23rn4m3',
            fullName: 'New User Name'
        };
        const updateUser = await db.updateUser(userId, updateUserData);

        expect(updateUser['username']).to.equal('u23rn4m3');
        expect(updateUser['password']).to.equal('password');
        expect(updateUser['fullName']).to.equal('New User Name');
    });

    it('should delete a user', async () => {
        const deleteUser = await db.deleteUser(userId);

        expect(deleteUser['id']).to.equal(userId);
    });
});