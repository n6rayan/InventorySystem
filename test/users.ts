import { expect } from 'chai';
import MongoMemoryServer from 'mongodb-memory-server';

import { Database } from '../src/database/database';

const db = new Database();
let mongod: MongoMemoryServer;

before((done) => {
	mongod = new MongoMemoryServer();

	mongod.getConnectionString()
	.then(mongoUri => {
		db._connect(mongoUri);

	})
	.then(() => done());
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
	it('should create a user', (done) => {
		db.createUser(userData).then(user => {
			expect(user).to.be.an('object');
			expect(user['id']).to.be.string;
			expect(user['email']).to.equal('email@fake-email.com');
		});

		done();
	});

	it('should fetch a user', (done) => {
		db.fetchUser('edfdsa')
		.then(user => {
			console.log(user);
		});

		done();
	});
});
