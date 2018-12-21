const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();

chai.use(chaiHttp);

describe('/GET healthcheck', () => {
    it('it should GET back a health check response', (done) => {
        chai.request(app).get('/healthcheck').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.message.should.equal('OK!');
            done();
        });
    });
});
