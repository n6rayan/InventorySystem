import { expect, request } from 'chai';
import app from '../../src/app';

describe('Check Item API Functionality', () => {
    let itemId: string;

    it('should create item', async () => {
        const res = await request(app)
        .post('/item')
        .send({ itemName: 'Milk', description: 'A carton of Milk.', price: 0.99 });

        itemId = res.body.itemId;
        
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(1);
        expect(res.body.message).to.match(/been created/);
        expect(res.body.itemId).to.be.string;
    });

    it('should not successfully fetch item', async () => {
        const res = await request(app).get('/item/12345');

        expect(res.body.success).to.equal(0);
        expect(res.body.message).to.match(/Cast to ObjectId/);
    });

    it('should successfully fetch item', async () => {
        const res = await request(app).get(`/item/${itemId}`);
        
        expect(res.body.description).to.equal('A carton of Milk.');
        expect(res.body.itemName).to.equal('Milk');
        expect(res.body.price).to.equal(0.99);
    });

    it('should update item', async () => {
        const res = await request(app)
        .put(`/item/${itemId}`)
        .send({ itemName: 'Cheese', description: 'A block of cheese.' });

        expect(res.body.success).to.equal(1);
        expect(res.body.message).to.match(/updated!/);
    });

    it('should delete item', async () => {
        const res = await request(app).delete(`/item/${itemId}`);

        expect(res.body.success).to.equal(1);
        expect(res.body.message).to.match(/deleted!/);
    });
});