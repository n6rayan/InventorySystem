const expect = require('chai').expect;
const apiClient = require('../APIClient');

const body = {
    name: "Nour Rayan",
    job: "Developer"
};

describe('Test API Client', () => {
    it('it should get create a new user', (done) => {
        apiClient.makeRequest('POST', 'https://reqres.in/api/users', {}, body, response => {
            expect(response.name).to.be.string;
            expect(response).have.property('id');
            expect(response).have.property('createdAt');
            expect(response.job).to.equal('Developer');
            done();
        });
    });

    it('it should return a missing method error', (done) => {
        apiClient.makeRequest('', 'https://reqres.in/api/users', {}, body, response => {
            expect(response).to.match(/Method is missing/);
            done();
        });
    });

    it('it should return a missing url error', (done) => {
        apiClient.makeRequest('POST', '', {}, body, response => {
            expect(response).to.match(/URL is missing/);
            done();
        });
    });

    it('it should get back a user', (done) => {
        apiClient.makeRequest('GET', 'https://reqres.in/api/users/2', {}, body, response => {
            expect(response.data).to.deep.include({first_name: "Janet"});
            done();
        });
    });
});
