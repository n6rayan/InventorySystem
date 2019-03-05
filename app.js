const express = require('express');
const slackClient = require('./built/SlackClient');
const logger = require('./built/Logger');

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

module.exports = app;
