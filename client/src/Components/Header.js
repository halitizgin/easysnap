import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Logout';
class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="logo">
                    <h2 className="logo__title">easysnap</h2>
                </div>
                <div className="header_menu">
                    <NavLink to="/" exact>snaps</NavLink>
                    {
                        this.props.session.activeUser ? <MenuWithLogin activeUser={this.props.session.activeUser}/> : <MenuWithUnLogin />
                    }
                </div>
            </div>
        );
    }
}

const MenuWithUnLogin = () => (
    <Fragment>
        <NavLink to="/login">login</NavLink>
        <NavLink to="/join">join</NavLink>  
    </Fragment>
);

const MenuWithLogin = ({ activeUser }) => (
    <Fragment>
        <NavLink to="/profile">@{activeUser.username}</NavLink>
        <Logout />
    </Fragment>
);

export default Header;