import { APIClient } from './APIClient';
import { Logger } from './Logger';

let apiClient = new APIClient();
let logger = new Logger();

export class SlackClient {
    url: string;

    constructor(webhook: string) {
        this.url = webhook;
    }

    public sendToSlack(message: string): void {
        let options = {
            method: 'POST',
            url: this.url,
            body: {
                attachments: [{
                    color: "#36a64f",
                    pretext: "PSSS! AN ENDPOINT WAS HIT!",
                    author_name: "Inventory System",
                    text: message
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