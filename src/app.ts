import * as express from 'express';

import { SlackClient } from './SlackClient';
import { Logger } from './Logger';

const slackClient = new SlackClient();
const logger = new Logger();

const app = express();

app.get('/healthcheck', (req, res) => {
    res.send({
        "status": 200,
        "message": "OK!"
    });

    slackClient.sendToSlack('healthcheck');
    logger.info('/healthcheck hit!');
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    let info = `Server started on port: ${port}.\nGo to http://localhost:${port}/healthcheck to see the health check.`;

    console.log(info);
    logger.info(info);
});

export default app;