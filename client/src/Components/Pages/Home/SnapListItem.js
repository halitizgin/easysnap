import React, { Component } from 'react';
import TimeAgo from 'react-timeago';

class SnapListItem extends Component {
    render() {
        const { snap } = this.props;
        return (
            <li className={ snap.id < 0 ? 'optimistic' : '' }>
                <div className="title">
                <span className="username">@{ snap.user.username }</span>
                &nbsp;&nbsp;
                { snap.text }
                </div>
                <div className="date">
                    <span>
                        { snap.id < 0 ? 'sending...' : <TimeAgo date={snap.createdAt} /> }
                    </span>
                </div>
            </li>
        );
    }
}

export default SnapListItem;