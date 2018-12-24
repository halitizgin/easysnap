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
            id
            username
            createdAt
            snaps{
                text
                createdAt
            }
        }
    }
`;

export const GET_SNAPS = gql`
    query{
        snaps{
            id
            text
            createdAt
            user{
                id
                username
            }
        }
    }
`;

export const ADD_SNAP = gql`
    mutation($text: String!, $userId: ID!, $createdAt: Date!) {
        addSnap(data: 
        { 
            text: $text, 
            userId: $userId,
            createdAt: $createdAt
        }
        ) {
            id
            text
            createdAt
            user{
                id
                username
            }
        }
    }
`;