import { expect, request } from 'chai';
import app from '../../src/app';

describe('Check HealthCheck Route', () => {

    it('it should GET back a health check response', async () => {
        const res = await request(app).get('/healthcheck');

        expect(res.status).to.equal(200);
        expect(res.body).to.be('object');
        expect(res.body.message).to.equal('OK!');
    });
});