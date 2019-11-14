const { makeExecutableSchema } = require('graphql-tools');

const multipleChangesTypeDefs = `type User {
  firstName: String!
  lastName: String!
  username: String!
  email: String!
  password: String!
  id: ID!
  name: String
}

input UserInput {
  firstName: String!
  lastName: String!
  username: String!
  email: String!
  password: String!
  name: String!
}`;

exports.schema = makeExecutableSchema({
  typeDefs: multipleChangesTypeDefs
});
