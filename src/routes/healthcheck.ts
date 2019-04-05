import { Router } from 'express';
import { SlackClient } from '../slackClient';

const router = Router();
const slackClient = new SlackClient();

router.get('/healthcheck', (req, res) => {
    const date = new Date();

    res.send({
        'status': 200,
        'message': 'OK!',
        'now': date.toLocaleString()
    });

    // TODO: IS-11 Log More Information For API Calls
    slackClient.sendToSlack('/healthcheck was hit!');
});

export { router };