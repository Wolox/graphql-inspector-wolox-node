const fs = require('fs');
const chalk = require('chalk');
const { info } = require('log-symbols');
const { logger } = require('express-wolox-logger');
const { success, error } = require('log-symbols');
const { args } = require('./command_parser');
const { mergeSchemas } = require('./schemas');
const { getChangesInSchema, logChanges } = require('./schemas');
const {
  status,
  categories,
  argsNames: { IGNORE_BREAKING, IGNORE_OLD_SCHEMA }
} = require('./constants');

const resolveInspection = (changes, oldSchemaFile, newSchema) => {
  if (changes.some(c => c.criticality.level === categories.BREAKING)) {
    logger.info(error, chalk.red('Breaking changes detected'));
    if (args[IGNORE_BREAKING]) {
      logger.info('Ignoring breaking changes.');
      mergeSchemas(oldSchemaFile, newSchema);
      process.exit(status.NO_ERROR_EXIT_STATUS);
    } else {
      logger.error('Inspection finished: Breaking changes detected and not ignored.');
      process.exit(status.ERROR_EXIT_STATUS);
    }
  } else {
    logger.info(success, chalk.green.bold('No breaking changes detected'));
    mergeSchemas(oldSchemaFile, newSchema);
    process.exit(status.NO_ERROR_EXIT_STATUS);
  }
};

const schemaInspection = (oldSchemaFile, newSchema) => {
  try {
    logger.info(info, 'Schema inspection:');
    const changes = [];
    if (fs.existsSync(oldSchemaFile)) {
      changes.push(...getChangesInSchema(oldSchemaFile, newSchema));
    } else if (args[IGNORE_OLD_SCHEMA]) {
      logger.info('Ignoring old schema file');
    } else {
      logger.error('Old schema file not found');
      process.exit(status.ERROR_EXIT_STATUS);
    }

    logChanges(changes);
    resolveInspection(changes, oldSchemaFile, newSchema);
  } catch (err) {
    logger.error(err);
    process.exit(status.ERROR_EXIT_STATUS);
  }
};

module.exports = { resolveInspection, schemaInspection };
