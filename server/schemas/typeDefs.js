const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
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
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(id: ID!): User
    users: [User]
    categories: [Category]
  }

  type Mutation{
    newUser(username: String!, email:String!, password: String!) : Auth
    login(email: String!, password: String!): Auth
    newCategory(name: String!, user: ID): Category
    newToDo(user: ID!, text: String!, categoryId: ID, date: String): ToDo
    deleteCategory(user: ID!, categoryId: ID!): Category
    deleteToDo(user: ID!, toDoId: ID!) : ToDo
    completeToDo(user: ID!, toDoId: ID!, completed: Boolean): ToDo
  }
`;

module.exports = typeDefs;
