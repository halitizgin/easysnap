import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_USER } from '../../Queries';
import Error from '../../Components/Error';

const initialState = {
    username: "",
    password: "",
    passwordConfirm: ""
};

class Join extends Component {
    state = {
        ...initialState
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    formValidate = () => {
        const { username, password, passwordConfirm } = this.state;
        const isInvalid = !username || !password || !passwordConfirm || password !== passwordConfirm
        return isInvalid;
    }

    formSubmit = () => {
        this.setState({
            ...initialState
        });
    }

    onSubmit = (e, addUser) => {
        e.preventDefault();
        addUser().then(async ({ data }) => {
            console.log(data);
            localStorage.setItem('token', data.addUser.token);
            await this.props.refetch();
            this.formSubmit();
            this.props.history.push('/');
        })
    }

    render() {
        const { username, password, passwordConfirm } = this.state;
        return (
            <div>
                <Mutation mutation={ADD_USER} variables={ { username, password } }>
                { (addUser, { loading, error }) => (
                    <form 
                    onSubmit={ (e) => {
                        this.onSubmit(e, addUser);
                    } }
                    className="user-form">
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
                            <input 
                            type="password" 
                            placeholder="confirm password" 
                            name="passwordConfirm"
                            value={passwordConfirm}
                            onChange={this.onChange}
                            />
                        </label>
                        <label>
                            <button disabled={loading || this.formValidate()}>Join</button>
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

export default withRouter(Join);