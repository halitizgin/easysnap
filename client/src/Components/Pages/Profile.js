import React, { Component } from 'react';
import Moment from 'react-moment';
import { withRouter } from 'react-router-dom';
import Auth from '../Auth';

class Profile extends Component 
{
    render(){
        return (
            <div>
                <h3>Profile</h3>
                <Moment date={this.props.activeUser.createdAt} format="YYYY/MM/DD" />
                <br/>
                @{this.props.activeUser.username} 
            </div>
        )
    }
}

export default Auth(session => session && session.activeUser)(withRouter(Profile));