import React from 'react';
import { Query } from 'react-apollo';
import { GET_ACTIVE_USER } from '../Queries';
import { Redirect } from 'react-router-dom';

const Auth = condition => Component => props => (
    <Query query={GET_ACTIVE_USER}>
        {
            ({ data, loading }) => {
                if (loading) return <div>Loading...</div>

                return condition(data) ? <Component { ...props } /> : <Redirect to="/" />
            }
        }
    </Query>
);

export default Auth;