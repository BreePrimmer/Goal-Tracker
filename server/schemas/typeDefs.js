const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    category: [category]
    todo: [toDo]
  }

  type category {
    id: ID!
    text:  String!
  }

  type toDo {
    id: ID!
    text: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(id: ID!): User
  }

  type Mutations{
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
