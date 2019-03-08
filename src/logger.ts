import * as config from 'config';
import { configure, getLogger } from 'log4js';

export class Logger {
    logger: any;

    constructor() {
        configure(config.get('log4js'));
        this.logger = getLogger('invsys');
    }

    public info(info: string): void {
        this.logger.info(info);
    }

    public error(error: string): void {
        this.logger.error(error);
    }

    public warning(warning: string): void {
        this.logger.warning(warning);
    }
}