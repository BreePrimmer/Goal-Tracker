import { gql } from "@apollo/client";
export const NEW_USER = gql`
  mutation newUser($username: String!, $email: String!, $password: String!) {
    newUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const NEW_CATEGORY = gql`
  mutation newCategory($name: String!, $user: ID!) {
    newCategory(name: $name, user: $user) {
      name
    }
  }
`;

export const NEW_GOAL = gql`
  mutation newGoal(
    $user: ID!
    $title: String!
    $text: String!
    $date: String
    $categoryId: ID
  ) {
    newGoal(
      user: $user
      title: $title
      text: $text
      date: $date
      categoryId: $categoryId
    ) {
      title
      text
      completed
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($user: ID!, $categoryId: ID!) {
    deleteCategory(user: $user, categoryId: $categoryId) {
      _id
      name
      user {
        username
      }
    }
  }
`;

export const DELETE_GOAL = gql`
  mutation deleteGoal($user: ID!, $goalId: ID!) {
    deleteGoal(user: $user, goalId: $goalId) {
      title
      date
    }
  }
`;

export const COMPLETE_GOAL = gql`
  mutation completeGoal($user: ID!, $goalId: ID!, $completed: Boolean!) {
    completeGoal(user: $user, goalID: $goalId, completed: $completed) {
      title
      text
      completed
      date
    }
  }
`;

export const CREATE_TODO = gql`
  mutation newToDo($user: ID!, $text: String!) {
    createTodo(user: $user, text: $text) {
      _id
      text
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($todoId: ID!, $user: ID!) {
    deleteTodo(todoId: $todoId, user: $user) {
      _id
      text
    }
  }
`;
