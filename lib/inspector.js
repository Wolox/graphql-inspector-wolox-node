const chalk = require('chalk');
const { logger } = require('express-wolox-logger');
const { success, error } = require('log-symbols');
const { args } = require('./commandParser');
const { mergeSchemas } = require('./schemas');
const {
  status,
  categories,
  argsNames: { IGNORE_BREAKING }
} = require('./constants');

const resolveInspection = (changes, oldSchemaFile, newSchema) => {
  if (changes.some(c => c.criticality.level === categories.BREAKING)) {
    logger.error(error, chalk.red('Breaking changes detected'));
    if (args[IGNORE_BREAKING]) {
      logger.info('Ignoring breaking changes.');
      mergeSchemas(oldSchemaFile, newSchema);
      process.exit(status.NO_ERROR_EXIT_STATUS);
    } else {
      process.exit(status.ERROR_EXIT_STATUS);
    }
  } else {
    logger.info(success, chalk.green.bold('No breaking changes detected'));
    mergeSchemas(oldSchemaFile, newSchema);
    process.exit(status.NO_ERROR_EXIT_STATUS);
  }
};

module.exports = { resolveInspection };
