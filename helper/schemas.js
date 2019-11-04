const fs = require('fs');
const { logger } = require('express-wolox-logger');
const { buildSchema } = require('graphql');
const { importSchema } = require('graphql-import');
const { diff } = require('@graphql-inspector/core');
const { success, warning, error } = require('log-symbols');

const criticalitySymbols = { BREAKING: error, DANGEROUS: warning, NON_BREAKING: success };

const mergeSchemas = (schemaToWrite, schemaToRead) => {
  logger.info('Merging schemas');
  fs.writeFileSync(schemaToWrite, schemaToRead);
};

const getChangesInSchema = (oldSchemaFile, newSchema) =>
  diff(buildSchema(importSchema(oldSchemaFile)), buildSchema(newSchema));

const logChanges = changes =>
  changes.forEach(change => {
    logger.info(criticalitySymbols[change.criticality.level], change.message);
  });

module.exports = { mergeSchemas, getChangesInSchema, logChanges };
