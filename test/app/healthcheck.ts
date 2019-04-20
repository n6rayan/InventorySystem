import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../../src/app';

chai.should();
chai.use(chaiHttp);

describe('Check HealthCheck Route', () => {
    it('it should GET back a health check response', (done) => {
        chai.request(app).get('/healthcheck').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.message.should.equal('OK!');
            done();
        });
    });
});