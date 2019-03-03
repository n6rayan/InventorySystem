var config = require('config');
const log4js = require('log4js');

const logConf = config.get('log4js');
log4js.configure(logConf);

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