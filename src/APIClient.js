const request = require('request');
const logger = require('./Logger');

const makeRequest = (method, url, headers, body, callback) => {
    if (!method) return callback (Error ('Method is missing!') );
    if (!url) return callback (Error ('URL is missing!') );

    method = method.toUpperCase(); // Ensure request method is upper-case.

    const options = {
        method: method,
        url: url,
        headers: headers,
        body: body,
        json: true
    };

    try {
        request(options, (err, res, body) => {
            if (err) throw(err);

            callback(body);
        });
    }
    catch (err) {
        logger.logError(err);
    }
}

module.exports.makeRequest = makeRequest;