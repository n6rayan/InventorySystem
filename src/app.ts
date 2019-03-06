import * as express from 'express';
import { SlackClient } from './src/SlackClient';
import { Logger } from './src/Logger';

const slackClient = new SlackClient('https://hooks.slack.com/services/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');
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
    //logger.info(info);
});

export default app;