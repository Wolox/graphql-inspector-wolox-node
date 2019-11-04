#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const { logger } = require('express-wolox-logger');
const { printSchema } = require('graphql');
const { info } = require('log-symbols');
const { args } = require('./helper/commandParser');
const { mergeSchemas, getChangesInSchema, logChanges } = require('./helper/schemas');
const { resolveInspection } = require('./resolvers/inspector');
const {
  status,
  argsNames: { OLD_SCHEMA, NEW_SCHEMA, IGNORE_OLD_SCHEMA }
} = require('./constants');

const processcwd = process.cwd();
const oldSchemaFile = `${processcwd}/${args[OLD_SCHEMA]}`;
const { schema } = require(`${processcwd}/${args[NEW_SCHEMA]}`);
const newSchema = printSchema(schema);

try {
  logger.info(info, 'Schema inspection:');

  if (!fs.existsSync(oldSchemaFile)) {
    logger.error('Old schema file not found');
    if (args[IGNORE_OLD_SCHEMA]) {
      logger.info('Ignoring old schema file');
      mergeSchemas(oldSchemaFile, newSchema);
      process.exit(status.NO_ERROR_EXIT_STATUS);
    } else {
      process.exit(status.ERROR_EXIT_STATUS);
    }
  }

  const changes = getChangesInSchema(oldSchemaFile, newSchema);
  logChanges(changes);
  resolveInspection(changes, oldSchemaFile, newSchema);
} catch (err) {
  logger.error(err);
  process.exit(status.ERROR_EXIT_STATUS);
}
