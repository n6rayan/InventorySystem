const express = require('express');
const slackClient = require('./src/SlackClient');
const logger = require('./src/Logger');

const app = express();

app.get('/healthcheck', (req, res) => {
    res.send({
        "status": 200,
        "message": "OK!"
    });

    slackClient.sendToSlack('healthcheck');
    logger.logInfo('/healthcheck hit!');
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    let info = `Server started on port: ${port}.\nGo to http://localhost:${port}/healthcheck to see the health check.`;

    console.log(info);
    logger.logInfo(info);
});

module.exports = app;
