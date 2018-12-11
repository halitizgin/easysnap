import React from 'react';
import { Query } from 'react-apollo';
import { GET_ACTIVE_USER } from '../Queries';

const SessionWrapper = Component => props => (
    <Query query={GET_ACTIVE_USER}>
        {
            ({ data, loading }) => {
                console.log(data);
                if (loading) return <div style={ { 'textAlign':'center' } }>Loading...</div>
    
                return <Component {...props}/>
            }
        }
    </Query>
);

export default SessionWrapper;