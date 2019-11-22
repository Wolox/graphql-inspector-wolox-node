const { makeExecutableSchema } = require('graphql-tools');

const breakingTypeDefs = `type User {
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
  name: String!
}`;

exports.schema = makeExecutableSchema({
  typeDefs: breakingTypeDefs
});
