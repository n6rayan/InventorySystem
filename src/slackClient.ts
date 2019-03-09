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
        const options = {
            method: 'POST',
            url: this.slackConfig['webhookUrl'],
            body: {
                attachments: [{
                    color: '#36a64f',
                    pretext: 'PSSS! AN ENDPOINT WAS HIT!',
                    author_name: 'Inventory System',
                    text: message,
                    ts: Math.floor(+new Date() / 1000)
                }]
            },
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };

        apiClient.makeRequest(options, response => {
            logger.info(response);
        });
    }
}