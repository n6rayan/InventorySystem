import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Database } from './database/database';
import * as healthcheck from './routes/healthcheck';

const db = new Database();

const app = express();

app.use(bodyParser.json());
app.use(healthcheck.router);

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
});

export default app;