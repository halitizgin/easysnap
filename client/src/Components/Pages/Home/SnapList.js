import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_SNAPS, SNAP_ADDED } from '../../../Queries';
import SnapListItem from './SnapListItem';

class SnapList extends Component {
    render() {
        return (
            <div>
                <Query query={GET_SNAPS}>
                    {
                        ({ data, subscribeToMore, loading, error }) => {
                            if (loading) return <div className="loading">Loading snaps...</div>
                            if (error) return <div>Error!</div>

                            subscribeToMore({
                                document: SNAP_ADDED,
                                updateQuery: (prev, { subscriptionData }) => {
                                    if (!subscriptionData.data) return prev;

                                    const newItem = subscriptionData.data.snapAdded;

                                    if (!prev.snaps.find(snap => snap.id === newItem.id)){
                                        return {
                                            ...prev,
                                            snaps: [newItem, ...prev.snaps]
                                        }
                                    }
                                    else
                                    {
                                        return prev;
                                    }
                                }
                            });

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