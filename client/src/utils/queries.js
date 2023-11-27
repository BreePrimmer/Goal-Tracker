import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      categories {
        _id
        name
        goals {
          _id
          title
          text
          date
          completed
        }
      }
      todos {
        _id
        text
      }
    }
  }
`;
