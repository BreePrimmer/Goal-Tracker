import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
login(email: $email, password: $password) {
    token
    user {
    _id
    username
    }
}
`;

export const NEW_USER = gql`
mutation newUser($username: String!, $email: String!, password: String!) {
    newUser(username: $username, email: $email, psasword: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const NEW_CATEGORY = gql`
mutation newCategory($name: String, user:ID) {
    newCategory (name: $name, userID: user) {
        name
        user {
            username
            _id
        }
    }
}
`;

export const NEW_TO_DO = gql`
mutation newToDo($user: ID!, text: String!, completed: Boolean) {
    newToDo (user: user, text: text, completed: completed) {
        _id
        text
        completed
        date
        user {
            username
        }
    }
}
`;

export const DELETE_CATEGORY = gql`
mutation deleteCategory($CatId: ID!) {
    deleteCategory(CatID: CatId){
        _id
        name
        user {
            username
        }
    }
}
`;

export const DELETE_TODO = gql` 
mutation deleteToDo($toDoId: ID!){
    deleteToDo(toDoId: toDoId) {
        _id
        text
        completed
        date
    }
}
`;