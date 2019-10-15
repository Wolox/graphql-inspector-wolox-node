#!/usr/bin/env node
/* eslint-disable no-console */

const { printSchema, buildSchema } = require('graphql');
const { importSchema } = require('graphql-import');
const { diff } = require('@graphql-inspector/core');
const { success, warning, error, info } = require('log-symbols');
const chalk = require('chalk');
const fs = require('fs');
const { breaking, errorExitStatus, oldSchemaArgIndex, newSchemaArgIndex } = require('./constants');

const processcwd = process.cwd();
const oldSchemaFile = `${processcwd}/${process.argv[oldSchemaArgIndex]}`;
const { schema } = require(`${processcwd}/${process.argv[newSchemaArgIndex]}`);
const newSchema = printSchema(schema);
const criticalitySymbols = { BREAKING: error, DANGEROUS: warning, NON_BREAKING: success };

const resolveWithoutBreakingChanges = (schemaToWrite, schemaToRead) => {
  console.log(success, chalk.green.bold('No breaking changes detected in schema'));
  fs.writeFileSync(schemaToWrite, schemaToRead);
};

const resolveWithBreakingChanges = () => {
  console.log(error, chalk.red('Breaking changes detected'));
  process.exit(errorExitStatus);
};

try {
  if (fs.existsSync(oldSchemaFile)) {
    console.log(info, 'Schema inspection:');
    const changes = diff(buildSchema(importSchema(oldSchemaFile)), buildSchema(newSchema));
    changes.forEach(change => {
      console.log(criticalitySymbols[change.criticality.level], change.message);
    });
    if (changes.some(c => c.criticality.level === breaking)) {
      resolveWithBreakingChanges();
    } else {
      resolveWithoutBreakingChanges(oldSchemaFile, newSchema);
    }
  } else {
    resolveWithoutBreakingChanges(oldSchemaFile, newSchema);
  }
} catch (err) {
  console.log(err);
  process.exit(errorExitStatus);
}
