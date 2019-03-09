import { expect } from 'chai';
import { APIClient } from '../src/apiClient';

const apiClient = new APIClient();

describe('Test API Client', () => {
    it('it should get create a new user', (done) => {
        const options = {
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: {
                name: "Nour Rayan",
                job: "Developer"
            },
            json: true
        };

        apiClient.makeRequest(options, response => {
            expect(response.name).to.be.string;
            expect(response).have.property('id');
            expect(response).have.property('createdAt');
            expect(response.job).to.equal('Developer');
            done();
        });
    });

    it('it should get back a user', (done) => {
        const options = {
            method: 'GET',
            url: 'https://reqres.in/api/users/2',
            json: true
        };

        apiClient.makeRequest(options, response => {
            expect(response.data).to.deep.include({
                first_name: "Janet",
                last_name: "Weaver"
            });
            done();
        });
    });
});
