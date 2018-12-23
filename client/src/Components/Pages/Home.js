import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { GET_SNAPS, ADD_SNAP } from '../../Queries';
import TimeAgo from 'react-timeago';

class Home extends Component {
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
            addSnap().then(({ data }) => console.log(data));
            this.setState({
                text: ''
            });
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
        return (
            <div>
                <div className="description">
                    <p className="sub_header__desc">simple snap app with <span>react</span>.</p>
                </div>

                <div>
                    <Mutation 
                    mutation={ADD_SNAP} 
                    variables={ { ...this.state } }
                    //refetchQueries={[{ query: GET_SNAPS }]}
                    update={this.updateCache}
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
                                    disabled={ !(session && session.activeUser) || loading }
                                    />
                                </form>
                            )
                        }
                    </Mutation>
                    
                </div>
                <div>
                    <Query query={GET_SNAPS}>
                        {
                            ({ data, loading, error }) => {
                                if (loading) return <div className="loading">Loading snaps...</div>
                                if (error) return <div>Error!</div>
                                return (
                                    <Fragment>
                                        <ul className="snaps">
                                            {
                                                data.snaps.map(snap => (
                                                    <li key={snap.id}>
                                                        <div className="title">
                                                        <span className="username">@{ snap.user.username }</span>
                                                        &nbsp;&nbsp;
                                                        { snap.text }
                                                        </div>
                                                        <div className="date">
                                                            <span>
                                                                <TimeAgo date={snap.createdAt} />
                                                            </span>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        <div className="counter">{ data.snaps.length } snap(s)</div>
                                    </Fragment>
                                )
                            }
                        }
                    </Query>
                </div>
            </div>
        );
    }
}

export default Home;