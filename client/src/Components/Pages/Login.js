import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import Error from '../../Components/Error';
import { LOGIN_USER } from '../../Queries';

const initialState = {
    username: "",
    password: ""
}

class Login extends Component {
    state = {
        ...initialState
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    formReset = () => {
        this.setState({
            ...initialState
        });
    }

    formValidate = () => {
        const { username, password } = this.state;
        const isInvalid = !username || !password;
        return isInvalid;
    }

    onSubmit = (e, signInUser) => {
        e.preventDefault();
        signInUser().then(async ({ data }) => {
            console.log(data);
            localStorage.setItem('token', data.signInUser.token);
            await this.props.refetch();
            this.formReset();
            this.props.history.push('/');
        });
    }

    render() {
        const { username, password } = this.state;
        return (
            <div>
                <Mutation mutation={LOGIN_USER} variables={ { username, password } }>
                    { (signInUser, { loading, error }) => (
                        <form onSubmit={ (e) => {
                            this.onSubmit(e, signInUser);
                            } } className="user-form">
                            <label>
                                <input 
                                type="text" 
                                placeholder="username" 
                                name="username"
                                value={username}
                                onChange={this.onChange}
                                />
                            </label>
                            <label>
                                <input 
                                type="password" 
                                placeholder="password" 
                                name="password"
                                value={password}
                                onChange={this.onChange}
                                />
                            </label>
                            <label>
                                <button disabled={this.formValidate()}>Login</button>
                            </label>

                            { loading && <div>Loading...</div> }
                            { error && <Error error={error} /> }
                        </form>
                    ) }
                </Mutation>
            </div>
        );
    }
}

export default withRouter(Login);