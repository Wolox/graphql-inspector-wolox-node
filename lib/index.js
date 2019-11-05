/* eslint-disable global-require */
const { logger } = require('express-wolox-logger');
const { args } = require('./command_parser');
const { schemaInspection } = require('./inspector');
const {
  argsNames: { OLD_SCHEMA, NEW_SCHEMA }
} = require('./constants');

const processcwd = process.cwd();
const oldSchemaFile = `${processcwd}/${args[OLD_SCHEMA]}`;
let newSchema = null;
try {
  const { schema } = require(`${processcwd}/${args[NEW_SCHEMA]}`);
  newSchema = schema;
} catch {
  logger.error('new schema file not found');
  process.exit(status.ERROR_EXIT_STATUS);
}
schemaInspection(oldSchemaFile, newSchema);
