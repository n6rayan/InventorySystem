const log4js = require('log4js');
log4js.configure({
    appenders: {
        invsys: {
            type: "file",
            filename: "inventory-system.log",
            encoding: "utf-8"
        }
    },
    categories: {
        default: {
            appenders: [
                "invsys"
            ],
            level: "debug"
        }
    }
});

const logger = log4js.getLogger('invsys');

const logInfo = (info) => {
    logger.info(info);
}

const logError = (error) => {
    logger.error(error);
}

const logWarning = (warning) => {
    logger.warn(warning);
}

module.exports.logInfo = logInfo;
module.exports.logError = logError;
module.exports.logWarning = logWarning;