import { gql } from '@apollo/client';
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
mutation newCategory($name:String, $user:ID) {
    newCategory(name:$name, user:$user) {
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

export const NEW_GOAL = gql`
mutation newGoal($user:ID!, $text:String!, categoryId:ID!, $date:String!) {
    newGoal(user:$user, text:$text, categoryid:$categoryID, date:$date) {
        _id
        title
        text
        completed
        date
    }
}
`;

export const DELETE_CATEGORY = gql`
mutation deleteCategory($user: ID!, $categoryId: ID!) {
    deleteCategory(user:$user ,categoryID: $categoryId){
        _id
        name
        user {
            username
        }
    }
}
`;

export const DELETE_GOAL = gql`
mutation deleteGoal(user: ID!, goalId: ID!){
    deleteGoal(user: $user, goalId:$goalID){
        title
        date
    }
}
`;

export const COMPLETE_GOAL = gql`
mutation completeGoal(user: ID!, goalId:ID!, completed:Boolean!) {
    completeGoal(user:$user, goalID:$goalId, completed: $completed){
        title
        text
        completed
        date
    }
}
`;

export const CREATE_TODO = gql`
mutation newToDo($user ID!, $text:String!) {
    createTodo(user:$user, text:$text) {
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


export const DELETE_TODO = gql` 
mutation deleteToDo($toDoId:ID!, user:ID!){
    deleteToDo(toDoId:$toDoId, user:user) {
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

