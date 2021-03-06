const { success, warning, error } = require('log-symbols');

const status = {
  NO_ERROR_EXIT_STATUS: 0,
  ERROR_EXIT_STATUS: 1
};

const argsNames = {
  IGNORE_BREAKING: 'ignore-breaking',
  IGNORE_OLD_SCHEMA: 'ignore-old-schema',
  OLD_SCHEMA: 'old-schema',
  NEW_SCHEMA: 'new-schema'
};

const categories = {
  BREAKING: 'BREAKING'
};
const criticalitySymbols = { BREAKING: error, DANGEROUS: warning, NON_BREAKING: success };

module.exports = { status, categories, argsNames, criticalitySymbols };
