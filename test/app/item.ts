import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../../src/app';

chai.use(chaiHttp);

describe('Check Item API Functionality', () => {
    let itemId: string;

    it('should create item', async () => {
        const res = await chai.request(app)
        .post('/item')
        .send({ itemName: 'Milk', description: 'A carton of Milk.', price: 0.99 });

        itemId = res.body.itemId;
        
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.success).to.equal(1);
        chai.expect(res.body.message).to.match(/been created/);
        chai.expect(res.body.itemId).to.be.string;
    });

    it('should not successfully fetch item', async () => {
        const res = await chai.request(app).get('/item/12345');

        chai.expect(res.body.success).to.equal(0);
        chai.expect(res.body.message).to.match(/Cast to ObjectId/);
    });

    it('should successfully fetch item', async () => {
        const res = await chai.request(app).get(`/item/${itemId}`);
        
        chai.expect(res.body.description).to.equal('A carton of Milk.');
        chai.expect(res.body.itemName).to.equal('Milk');
        chai.expect(res.body.price).to.equal(0.99);
    });

    it('should update item', async () => {
        const res = await chai.request(app)
        .put(`/item/${itemId}`)
        .send({ itemName: 'Cheese', description: 'A block of cheese.' });

        chai.expect(res.body.success).to.equal(1);
        chai.expect(res.body.message).to.match(/updated!/);
    });

    it('should delete item', async () => {
        const res = await chai.request(app).delete(`/item/${itemId}`);

        chai.expect(res.body.success).to.equal(1);
        chai.expect(res.body.message).to.match(/deleted!/);
    });
});