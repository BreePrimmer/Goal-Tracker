import { gql } from "@apollo/client";

export const QUERY_ME = gql `
    query user ($id : ID!) {
     user(id: $id ) {
        user {
            _id
            username
            email
            categories{
                _id
                name
                todos {
                    _id
                    text
                    completed
                    date
                }
            }
        }
    }
`;