import * as request from 'request';

interface Options {
    method: string;
    url: string,
    body?: object,
    headers?: object,
    json?: boolean
}

export class APIClient {
    // TODO: IS-14: Update App To Use Promises
    public makeRequest(options: Options, callback: any): void {
        try {
            request(options, (err, res, body) => {
                if (err) throw new Error(err);

                callback(body);
            });
        }
        catch (err) {
            callback({
                success: 0,
                error: err
            });
        }
    }
}