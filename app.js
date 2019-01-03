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

app.listen(3000, () => {
    console.log("Server started on port 3000.\nGo to http://127.0.0.1:3000 to see the health check.");
});

module.exports = app;
