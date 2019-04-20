import * as config from 'config';

import { APIClient } from './apiClient';
import { Logger } from './logger';

const apiClient = new APIClient();
const logger = new Logger();

export class SlackClient {
    private slackConfig: object;

    constructor() {
        this.slackConfig = config.get('slack');
    }

    public sendToSlack(message: string): void {
        const timestamp = Math.floor(+new Date() / 1000);
        const options = {
            method: 'POST',
            url: this.slackConfig['webhookUrl'],
            data: {
                attachments: [{
                    color: '#36a64f',
                    pretext: 'PSSS! AN ENDPOINT WAS HIT!',
                    author_name: 'Inventory System',
                    text: message,
                    ts: timestamp
                }]
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        apiClient.makeRequest(options)
        .then(response => logger.info(`Slack said ${response}`))
        .catch(err => logger.error(err));
    }
}