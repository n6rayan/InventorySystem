const chai = require('chai');
const chaiFs = require('chai-fs');
const chaiHttp = require('chai-http');

chai.use(chaiFs);
chai.use(chaiHttp);

const app = require('../app');
const logger = require('../Logger');

describe('Logging Test', () => {
    it('it should write to inventory-system.log', (done) => {
        chai.request(app).get('/healthcheck').end((err, res) => {
            ('./inventory-system.log').should.be.a.file().with.contents.that.match(/healthcheck hit!/);
            done();
        });
    });
});