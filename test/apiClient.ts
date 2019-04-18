import { expect } from 'chai';
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
            },
            json: true
        };

        const request = await apiClient.makeRequest(options);
        
        expect(request['name']).to.be.string;
        expect(request).have.property('id');
        expect(request).have.property('createdAt');
        expect(request['job']).to.equal('Developer');
    });

    it('should fetch and return a user', async () => {
        const options = {
            method: 'GET',
            url: 'https://reqres.in/api/users/2',
            json: true
        };

        const request = await apiClient.makeRequest(options);
        expect(request['data']).to.deep.include({
            first_name: "Janet",
            last_name: "Weaver"
        });
    });
});
