import { expect } from 'chai';
import * as nock from 'nock';
import { APIClient } from '../src/apiClient';

const apiClient = new APIClient();

describe('Test API Client', () => {
    it('should create a new user', async () => {
        const options = {
            method: 'POST',
            url: 'https://reqres.in/api/users',
            data: {
                name: "Nour Rayan",
                job: "Developer"
            }
        };

        nock('https://reqres.in')
        .post('/api/users', { name: "Nour Rayan", job: "Developer" })
        .reply(200, { name: "Nour Rayan", id: 123, createdAt: "blah", job: "Developer" });

        const request = await apiClient.makeRequest(options);
        expect(request['name']).to.be.string;
        expect(request).have.property('id');
        expect(request).have.property('createdAt');
        expect(request['job']).to.equal('Developer');
    });

    it('should fetch and return a user', async () => {
        const options = {
            method: 'GET',
            url: 'https://reqres.in/api/users/2'
        };

        nock('https://reqres.in')
        .get('/api/users/2')
        .reply(200, {
            data: {
                id: 2,
                first_name: 'Janet',
                last_name: 'Weaver',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg'
            }
        });

        const request = await apiClient.makeRequest(options);
        expect(request['data']).to.deep.include({
            first_name: "Janet",
            last_name: "Weaver"
        });
    });
});