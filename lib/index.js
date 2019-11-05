const fs = require('fs');
const { logger } = require('express-wolox-logger');
const { printSchema } = require('graphql');
const { info } = require('log-symbols');
const { args } = require('./commandParser');
const { getChangesInSchema, logChanges } = require('./schemas');
const { resolveInspection } = require('./inspector');
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
