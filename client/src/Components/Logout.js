import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

const onLogout = (history, client) => {
    localStorage.setItem('token', '');
    history.push('/');
    client.resetStore();
};

class Logout extends Component
{
    render(){
        return (
            <ApolloConsumer>
                {
                    (client) => {
                        return <button onClick={ () => onLogout(this.props.history, client) }>Logout</button>
                    }
                }
            </ApolloConsumer>
        )
    }
}

export default withRouter(Logout);