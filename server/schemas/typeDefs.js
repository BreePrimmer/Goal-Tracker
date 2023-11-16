const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    categories: [Category]
  }

  type Category {
    _id: ID!
    name: String
    user: User
    todos: [ToDo]
  }

  type ToDo {
    _id: ID!
    text: String!
    completed: Boolean!
    date: String!
    category: Category
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation{
    newUser(username: String!, email:String!, password: String!) : Auth
    login(email: String!, password: String!): Auth
    newCategory(name: String!, user: ID): Category
    newToDo(user: ID!, text: String!, completed: Boolean): ToDo
  }
`;

module.exports = typeDefs;
