# graphql-inspector-wolox-node

## Summary
Simple schema inspector that uses `graphql-inspector` for comparing schemas looking for differences between them and categorizing them into three possible categories:
* NON_BREAKING
* DANGEROUS
* BREAKING

At last, if no breaking changes are found, it replace the old schema with the new schema.
## Usage
It must be called with: `node schema_inspector.js <oldSchemaPath> <newSchemaPath>`.

Supported extensions: 
* oldSchemaPath:
  * .graphql
  * .json
* newSchemaPath:
  * .js file that exports a GraphQLType variable named schema.
