import { gql } from 'apollo-boost';

export const ADD_USER = gql`
    mutation($username: String!, $password: String!) {
        addUser(data: { username: $username, password: $password }) {
            token
        }
    }
`;

export const LOGIN_USER = gql`
    mutation($username:String! $password:String!) {
        signInUser(data: { username:$username password:$password }) {
            token
        }
    }
`;

export const GET_ACTIVE_USER = gql`
    query{
        activeUser{
            username
            createdAt
        }
    }
`;