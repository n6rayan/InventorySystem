import * as request from 'request';
import * as logger from './Logger';

export class APIClient {
    baseUrl: string;

    constructor(url: string) {
        this.baseUrl = url;
    }

    public get(endpoint: string): void {
        request.get(this.baseUrl + endpoint);
    }

    public makeRequest(method: string, headers: object, body: object, callback: void): void {
        method = method.toUpperCase();
    };
}

const makeRequest = (method: string, url: string, headers: object, body: object, callback: void) => {
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
        logger.error(err);
    }
}

module.exports.makeRequest = makeRequest;