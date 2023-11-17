import { gql } from "@apollo/client";

export const QUERY_ME = gql `
    query Get LoggedInUser {
        me {
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