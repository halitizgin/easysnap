import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_SNAPS } from '../../../Queries';
import SnapListItem from './SnapListItem';

class SnapList extends Component {
    render() {
        return (
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
                                                <SnapListItem key={snap.id} snap={snap} />
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
        );
    }
}

export default SnapList;