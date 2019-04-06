import { Router } from 'express';
import { Database } from '../database/database';
import { SlackClient } from '../slackClient';
import { Logger } from '../logger';

const router = Router();
const db = new Database();
const slackClient = new SlackClient();
const logger = new Logger();

router.post('/item', (req, res) => {

    db.createItem({
        itemName: req.body.itemName,
        description: req.body.description,
        price: req.body.price
    })
    .then(item => {
        res.send({
            success: 1,
            message: 'Item has been created',
            itemId: item["_id"]
        });
    })
    .catch(err => {
        res.send({ success: 0, message: err.message });
        logger.error(err.message);
    });

    slackClient.sendToSlack('/item was hit');
});

router.get('/item/:itemId', (req, res) => {

    db.fetchItem(req.params.itemId)
    .then(item => {
        res.send(item)
    })
    .catch(err => {
        res.send({ success: 0, message: err.message })
        logger.error(err.message);
    });

    slackClient.sendToSlack('/item was hit');
});

export { router };