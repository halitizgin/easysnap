import React from 'react';
import { Subscription } from 'react-apollo';
import { USER_ADDED } from '../../../Queries';
 
const JoinedUs = () => (
    <div>
        <Subscription subscription={USER_ADDED}>
        {
            ({ data, loading }) => (
                <div className="joinedUs">
                    {
                        !loading &&
                        <div>
                            <strong>{ data.userAdded.username }</strong> is joined to us!
                        </div>
                    }
                </div>
            )
        }
        </Subscription>
    </div>
)

export default JoinedUs;