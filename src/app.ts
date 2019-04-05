import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Database } from './database/database';
import { Logger } from './logger';
import { SlackClient } from './slackClient';
import Item from './database/models/item';

const db = new Database();
const logger = new Logger();
const slackClient = new SlackClient();

const app = express();

app.use(bodyParser.json());

app.get('/healthcheck', (req, res) => {
    const date = new Date();

    res.send({
        'status': 200,
        'message': 'OK!',
        'now': date.toLocaleString()
    });

    // TODO: IS-13 Log More Information For API Calls
    slackClient.sendToSlack('healthcheck');
    logger.info('/healthcheck hit!');
});

app.route('/item').post((req, res) => {
    db.insertItem({
        itemName: req.body.itemName,
        description: req.body.description,
        price: req.body.price
    }).then(item => {
        res.send({ success: 1, message: 'Item has been created', itemId: item["_id"]});
    }).catch(err => {
        res.send(err);
    });
});

app.route('/item/:itemId').get((req, res) => {
    db.getItem(req.params.itemId).then(item => {
        res.send(item)
    }).catch(err => {
        res.send(err);
    });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    let info = `Server started on port: ${port}.\nGo to http://localhost:${port}/healthcheck to see the health check.`;

    console.log(info);
    logger.info(info);
});

export default app;