import * as request from 'request';

import { Logger } from './Logger';

let logger = new Logger();

interface Options {
    method: string;
    url: string,
    body: object,
    headers: object,
    json: boolean
}

export class APIClient {
    public makeRequest(options: Options, callback: any): void {
        try {
            request({
                method: options.method,
                url: options.url,
                headers: options.headers,
                body: options.body,
                json: options.json
            },
            (err, res, body) => {
                if (err) throw err;

                callback(body);
            });
        }
        catch(err) {
            logger.error(err);
        }
    }
}