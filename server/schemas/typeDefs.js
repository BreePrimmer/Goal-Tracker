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
    name: String
    user:  User
    todos: toDo
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
    newCategory(name:String, user: ID): category
  }
`;

module.exports = typeDefs;
