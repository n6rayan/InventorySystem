const apiClient = require('./APIClient');
const logger = require('./Logger');

const url = 'https://hooks.slack.com/services/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';
const headers = {
    'Content-Type': 'application/json'
};
const epoch = Math.floor(new Date() / 1000);
let body = {
    attachments: [{
            color: "#36a64f",
            pretext: "PSSS! AN ENDPOINT WAS HIT!",
            author_name: "Inventory System",
            ts: epoch
    }]
};

const sendToSlack = (endpoint) => {
    body.attachments[0].text = '/' + endpoint;

    try {
        apiClient.makeRequest('POST', url, headers, body, response => {
            logger.logInfo(`Slack Replied: "${response}"`);
        });
    }
    catch (err) {
        logger.logInfo(err);
    };
};

module.exports.sendToSlack = sendToSlack;