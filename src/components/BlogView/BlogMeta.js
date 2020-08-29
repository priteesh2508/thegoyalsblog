import React from "react";
import _ from 'lodash';
import { withFirestore } from 'react-redux-firebase'

import Comments from "./Comments";
import Modal from "../Modal";
import GoogleAuth from "../GoogleAuth";

class BlogMeta extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            liked: this.props.auth.isSignedIn && _.findIndex(this.props.blog.likes, ['userId', this.props.auth.userProfile.userId]) !== -1,
            showModal: false
        }
    }

    onLikeClick = () => {
        if (!this.props.auth.isSignedIn) {
            this.setState({showModal:true});
        } else {
            let blog;
            if (this.state.liked) {
                const likes = this.props.blog.likes.filter((obj) => {
                    return obj.userId !== this.props.auth.userProfile.userId
                });
                blog = {...this.props.blog, likes};
            } else {
                blog = {
                    ...this.props.blog,
                    likes: [...this.props.blog.likes, _.pick(this.props.auth.userProfile, 'userName', 'userId')]
                };
            }
            this.setState({liked: !this.state.liked});
            this.props.firestore.set({collection: 'blogs', doc: this.props.id}, blog);
        }
    };

    renderLikesText = () => {
        if(this.props.blog.likes.length === 0) {
            return 'Be the first to like this post'
        } else if (this.props.blog.likes.length === 1) {
            return `Liked by ${this.props.blog.likes[this.props.blog.likes.length-1].userName}`
        } else {
            return `Liked by ${this.props.blog.likes[this.props.blog.likes.length-1].userName} and ${this.props.blog.likes.length -1} others`
        }
    };

    onShareClick = (platform) => {
        const curUrl = window.location.href;
        let url;
        switch (platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${curUrl}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${this.props.blog.title}%20Read%20here%20at%20${curUrl}%20by%20%40priteesh2508`;
                break;
            case 'linkedin':
                url = "linkedinurl";
                break;
            case 'insta':
                url = 'instaurl';
                break;
            default:
                break;
        }
        window.open(url);
    };

    showModal = () => {
        if (this.state.showModal) {
            window.scroll(0,0);
            return <Modal title="Hey There!" content="You need to signIn to continue" action={<GoogleAuth/>} onDismiss={() => this.setState({showModal: false})}/>
        }
    };

    render() {

        return (
            <div className="ui text container">
                <div className="ui horizontal header divider">~</div>
                <div className="ui grid">
                    <div className="six wide column">
                        <i className={`heart large icon ${(this.state.liked)? 'red': 'outline'}`} onClick={() => this.onLikeClick()}/> {this.renderLikesText()}
                    </div>
                    <div className="ten wide column right aligned" >
                        Share:
                        <button style={{marginLeft:"1em"}} className="ui circular facebook icon button" onClick={() => {this.onShareClick('facebook')}}>
                        <i className="facebook icon"/>
                    </button>
                        <button style={{marginRight:"2em"}} className="ui circular twitter icon button" onClick={() => {this.onShareClick('twitter')}}>
                            <i className="twitter icon"/>
                        </button>
                    </div>
                </div>
                <Comments blog={this.props.blog} blogId={this.props.id} auth={this.props.auth}/>
                {this.showModal()}
            </div>
        );
    }

}

export default withFirestore(BlogMeta);