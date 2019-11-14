const { makeExecutableSchema } = require('graphql-tools');

const noChangesTypeDefs = `type User {
  firstName: String!
  lastName: String!
  username: String!
  email: String!
  password: String!
  id: ID!
}

input UserInput {
  firstName: String!
  lastName: String!
  username: String!
  email: String!
  password: String!
}`;

exports.schema = makeExecutableSchema({
  typeDefs: noChangesTypeDefs
});
