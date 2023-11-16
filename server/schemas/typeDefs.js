const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    category: [category]
  }

  type category {
    id: ID!
    name: String
    user:  [User]
    todos: [toDo]
  }

  type toDo {
    id: ID!
    text: String!
    completed: boolean!
    date: String!
    category: [category]
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
    newToDo(user: ID!, text: String!, completed: boolean,) : toDo
  }
`;

module.exports = typeDefs;
