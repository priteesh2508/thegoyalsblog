import React from "react";
import {connect} from 'react-redux';
import {signIn, signOut} from "../actions";

class GoogleAuth extends React.Component {

    componentDidMount() {
        const clientID = '557593352050-q3jtc5mio51n24u01dtgll8j7ln6dq25.apps.googleusercontent.com';
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: clientID,
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getBasicProfile());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        }
        if (this.props.isSignedIn) {
            return (
                <button className="ui inverted google primary button" onClick={this.onSignOutClick}>
                    <i className="google icon"/>Sign Out
                </button>
            )
        }
        return (
            <button className="ui inverted google primary button" onClick={this.onSignInClick}>
                <i className="google icon"/>Sign in With Google
            </button>
        )
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);