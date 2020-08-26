import React from "react";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";

class FollowersPanel extends React.Component{

    renderSubscribers = () => {
        if (!this.props.subscribers) {
            return <div>Loading....</div>
        }
        return this.props.subscribers.slice(0,25).map((subscriber) => {
            return (
                <img className="ui image" key={subscriber.id} src={subscriber.imageUrl} alt={subscriber.userName} title={subscriber.userName}/>
            )
        })
    };

    render() {
        return (
            <div className="ui card">
                <div className="content">
                    <div className="header">Subscribers</div>
                </div>
                <div className="content">
                    <div className="ui mini images">
                        {this.renderSubscribers()}
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {subscribers: state.firestore.ordered.subscribers}
};

export default compose(firestoreConnect(() => ['subscribers']), connect(mapStateToProps))(FollowersPanel);