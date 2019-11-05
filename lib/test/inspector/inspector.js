/* eslint-disable global-require */
const fs = require('fs');
const { schemaInspection } = require('../../inspector');
const { args } = require('../../command_parser');
const {
  status: { NO_ERROR_EXIT_STATUS, ERROR_EXIT_STATUS },
  argsNames: { IGNORE_BREAKING, IGNORE_OLD_SCHEMA }
} = require('../../constants');

const oldSchemaPath = 'lib/test/support/old_schema_files/user/schema.graphql';
const oldSchemaWrongPath = 'lib/test/support/old_schema_files/user/unexistent_schema.graphql';
const noChangesSchemaPath = '../support/new_schema_files/user/no_changes_schema.js';
const breakingSchemaPath = '../support/new_schema_files/user/breaking_schema.js';
const nonBreakingSchemaPath = '../support/new_schema_files/user/non_breaking_schema.js';
const multipleChangesSchemaPath = '../support/new_schema_files/user/multiple_changes_schema.js';
const wrongNewSchemaPath = '../support/new_schema_files/user/unexistent_schema.js';

describe('inspector', () => {
  let newSchema = null;
  let exitSpy = null;
  let writingMock = null;
  beforeEach(() => {
    exitSpy = jest.spyOn(process, 'exit').mockImplementation(exitStatus => exitStatus);
    writingMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(exitStatus => exitStatus);
  });

  afterEach(() => {
    exitSpy.mockRestore();
    writingMock.mockRestore();
  });

  describe('No changes', () => {
    beforeEach(() => {
      const { schema } = require(`${noChangesSchemaPath}`);
      newSchema = schema;
    });
    test('Check exit status', () => {
      schemaInspection(oldSchemaPath, newSchema);
      expect(exitSpy.mock.results[0].value).toBe(NO_ERROR_EXIT_STATUS);
    });
  });

  describe('Non-breaking changes', () => {
    beforeEach(() => {
      const { schema } = require(`${nonBreakingSchemaPath}`);
      newSchema = schema;
    });
    test('Check exit status', () => {
      schemaInspection(oldSchemaPath, newSchema);
      expect(exitSpy.mock.results[0].value).toBe(NO_ERROR_EXIT_STATUS);
    });
  });

  describe('Breaking changes', () => {
    beforeEach(() => {
      const { schema } = require(`${breakingSchemaPath}`);
      newSchema = schema;
    });

    test('Check exit status', () => {
      schemaInspection(oldSchemaPath, newSchema);
      expect(exitSpy.mock.results[0].value).toBe(ERROR_EXIT_STATUS);
    });

    test('Check exit status with ignore-breaking option', () => {
      args[IGNORE_BREAKING] = true;
      schemaInspection(oldSchemaPath, newSchema);
      expect(exitSpy.mock.results[0].value).toBe(NO_ERROR_EXIT_STATUS);
      args[IGNORE_BREAKING] = false;
    });
  });

  describe('No old schema', () => {
    beforeEach(() => {
      const { schema } = require(`${noChangesSchemaPath}`);
      newSchema = schema;
    });

    test('Check exit status', () => {
      schemaInspection(oldSchemaWrongPath, newSchema);
      expect(exitSpy.mock.results[0].value).toBe(ERROR_EXIT_STATUS);
    });

    test('Check exit status with ignore-old-file option', () => {
      args[IGNORE_OLD_SCHEMA] = true;

      schemaInspection(oldSchemaWrongPath, newSchema);
      expect(exitSpy.mock.results[0].value).toBe(NO_ERROR_EXIT_STATUS);
      args[IGNORE_OLD_SCHEMA] = false;
    });
  });

  describe('Breaking and non-breaking', () => {
    beforeEach(() => {
      const { schema } = require(`${multipleChangesSchemaPath}`);
      newSchema = schema;
    });

    test('Check status code', () => {
      schemaInspection(oldSchemaPath, newSchema);
      expect(exitSpy.mock.results[0].value).toBe(ERROR_EXIT_STATUS);
    });
  });
});
