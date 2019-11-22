const { makeExecutableSchema } = require('graphql-tools');

const nonBreakingTypeDefs = `type User {
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
}`;

exports.schema = makeExecutableSchema({
  typeDefs: nonBreakingTypeDefs
});
