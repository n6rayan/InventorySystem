import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../../src/app';

chai.use(chaiHttp);

describe('Check HealthCheck Route', () => {

    it('it should GET back a health check response', async () => {
        const res = await chai.request(app).get('/healthcheck');

        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.message).to.equal('OK!');
    });
});