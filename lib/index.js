const { printSchema } = require('graphql');
const { args } = require('./command_parser');
const { schemaInspection } = require('./inspector');
const {
  argsNames: { OLD_SCHEMA, NEW_SCHEMA }
} = require('./constants');

const processcwd = process.cwd();
const oldSchemaFile = `${processcwd}/${args[OLD_SCHEMA]}`;
const { schema } = require(`${processcwd}/${args[NEW_SCHEMA]}`);
const newSchema = printSchema(schema);

schemaInspection(oldSchemaFile, newSchema);
