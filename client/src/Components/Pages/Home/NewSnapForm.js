import React, { Component } from 'react';
import { GET_SNAPS, ADD_SNAP } from '../../../Queries';
import { Mutation } from 'react-apollo';

class NewSnapForm extends Component {
    state = {
        text: '',
        userId: ''
    }

    onChange = e =>
    {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount(){
        const { session } = this.props;
        if (session && session.activeUser)
        {
            this.setState({
                userId: this.props.session.activeUser.id
            });
        }
    }

    formValidate = () => {
        const { text } = this.state;
        return !text;
    }

    onSubmit = (e, addSnap) => {
        e.preventDefault();
        if (!this.formValidate())
        {
            this.setState({
                text: ''
            });
            addSnap().then(({ data }) => 
                {
                    
                }
            );
        }
    }

    updateCache = (cache, { data: { addSnap } }) => {
        const { snaps } = cache.readQuery({
            query: GET_SNAPS
        });
        
        cache.writeQuery({
            query: GET_SNAPS,
            data: {
                snaps: [addSnap, ...snaps]
            }
        });
    }

    render() {
        const { session } = this.props;
        const optimisticResponse = {
            __typename: "Mutation",
            addSnap: {
                __typename: "Snap",
                id: Math.round(Math.random() * -200000),
                text: this.state.text,
                createdAt: new Date(),
                user: {
                    __typename: "User",
                    ...session.activeUser
                }
            }
        };
        return (
            <div>
                <Mutation 
                mutation={ADD_SNAP} 
                variables={ { ...this.state, createdAt: new Date() } }
                update={this.updateCache}
                optimisticResponse={ optimisticResponse }
                >
                    {
                        (addSnap, { loading, error }) => (
                            <form onSubmit={ e => {
                                this.onSubmit(e, addSnap);
                            } }>
                                <input 
                                className="add-snap__input" 
                                type="text"
                                name="text"
                                value={this.state.text}
                                onChange={this.onChange}
                                placeholder={ session && session.activeUser ? "add snap" : "please login" } 
                                disabled={ !(session && session.activeUser) }
                                />
                            </form>
                        )
                    }
                </Mutation>
                
            </div>
        );
    }
}

export default NewSnapForm;