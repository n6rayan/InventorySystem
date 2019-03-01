const express = require('express');
const slackClient = require('./SlackClient');

const app = express();

app.get('/healthcheck', (req, res) => {
    res.send({
        "status": 200,
        "message": "OK!"
    });

    slackClient.sendToSlack('healthcheck');
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server started on port: ${port}.\nGo to http://localhost:${port}/healthcheck to see the health check.`);
});

module.exports = app;