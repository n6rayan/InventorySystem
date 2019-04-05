import { Router } from 'express';
import { SlackClient } from '../slackClient';
import { Logger } from '../logger';

const router = Router();
const slackClient = new SlackClient();
const logger = new Logger();

router.get('/healthcheck', (req, res) => {
    const date = new Date();

    res.send({
        'status': 200,
        'message': 'OK!',
        'now': date.toLocaleString()
    });

    // TODO: IS-11 Log More Information For API Calls
    slackClient.sendToSlack('/healthcheck was hit!');
    logger.info('/healthcheck hit!');
});

export { router };