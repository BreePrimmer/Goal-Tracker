const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    categories: [Category]
    todos: [Todo]
  }

  type Category {
    _id: ID!
    name: String
    user: User
    goals: [Goal]
  }

  type Goal {
    _id: ID!
    title: String!
    text: String!
    completed: Boolean!
    date: String!
  }

  type Todo {
    _id: ID!
    text: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(id: ID!): User
    users: [User]
    me: User
  }

  type Mutation{
    newUser(username: String!, email:String!, password: String!) : Auth
    login(username: String!, password: String!): Auth
    newCategory(name: String!, user: ID!): Category
    newGoal(user: ID!, text: String!, categoryId: ID, date: String): Goal
    deleteCategory(user: ID!, categoryId: ID!): Category
    deleteGoal(user: ID!, goalId: ID!) : Goal
    completeGoal(user: ID!, goalId: ID!, completed: Boolean): Goal
    createTodo(user: ID!, text: String!): Todo
    deleteTodo(user: ID!, todoId: ID!): Todo
  }
`;

module.exports = typeDefs;
