import { assert, use, request } from 'chai';
import chaiFs = require('chai-fs');
import chaiHttp = require('chai-http');

import app from '../src/app';

use(chaiFs);
use(chaiHttp);

describe('Logging Test', () => {
    it('it should check contents of inventory-system.log', (done) => {
        request(app).get('/healthcheck').end((err, res) => {
            assert.fileContentMatch('./logs/inventory-system.log', /invsys - Slack said: ok/);
            done();
        });
    });
});