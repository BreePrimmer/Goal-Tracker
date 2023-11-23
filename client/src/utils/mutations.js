import { gql } from '@apollo/client';

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

export const NEW_CATEGORY = gql`
mutation newCategory($name: String, $user: ID) {
    newCategory(name: $name, user: $user) {
        name
        toDo {
            completed
            date
        }
        user {
            username
            _id
        }
    }
}  
`;

export const NEW_TO_DO = gql`
mutation newToDo($user: ID!, $text: String!, $completed: Boolean) {
    newToDo(user: $user, text: $text, completed: $completed) {
        _id
        text
        completed
        date
        user {
            username
            _id
        }
    }
}
`;

export const DELETE_CATEGORY = gql`
mutation deleteCategory($CatId: ID!) {
    deleteCategory(CatID: $CatId){
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
    deleteToDo(toDoId: $toDoId) {
        _id
        text
        completed
        date
    }
}
`;

export const COMPLETED_TODO = gql`
mutation completedToDo($user: ID!, $toDoId: ID!) {
    completeToDo(user: $user, toDoId: $toDoId) {
        _id
        text
        completed
        date
        user {
            _id
            username
        }
    }
}  
`

