import React from "react";
import { withFirestore } from 'react-redux-firebase';
import _ from 'lodash';

import CommentForm from "./CommentForm";
import "../../stylesheets/comments.css"
import {getMetaInfo} from "../../meta";
import Modal from "../Modal";
import GoogleAuth from "../GoogleAuth";

/*
    [:id]: {
		user:{} 
		timestamp:
		replies:[]
		body:
	}
*/
class Comments extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            replyFor: null,
            showModal: false
        }
    }

    onDeleteClick = (commentId, replyId) => {
        if (!replyId) {
            this.props.firestore.set({collection: "blogs", doc: this.props.blogId}, {
                ...this.props.blog,
                comments: _.omit(this.props.blog.comments, commentId)
            });
        } else {
            const replies = this.props.blog.comments[commentId].replies.filter((reply) =>
                 reply.id !== replyId
            );
            this.props.firestore.set({collection: "blogs", doc: this.props.blogId}, {
                ...this.props.blog,
                comments: {
                    ...this.props.blog.comments,
                    [commentId]: {
                        ...this.props.blog.comments[commentId],
                        replies: replies
                    }
                }
            });
        }
    };


    renderReplies = (comment, commentId) => {
        return comment.replies.map((reply) => {
            return (
                <div key={reply.id} className="comment replycomment">
                    <a className="avatar" href={`mailto:${comment.user.email}`}>
                        <img className="image mini" src={reply.user.imageUrl} alt={reply.user.userName}/>
                    </a>
                    <div className="content">
                        <a className="author" href={`mailto:${comment.user.email}`}>{reply.user.userName}</a>
                        <div className="metadata">
                            <span className="date">{getMetaInfo(reply.timestamp)}</span>
                        </div>
                        <div className="text">
                            <p>{reply.body}</p>
                        </div>
                        <div className="actions">
                            <a className="reply" onClick={() => this.onDeleteClick(commentId, reply.id)}>Delete</a>
                        </div>
                    </div>
                </div>
            )
        })
    };

    renderComments = () => {
        if (!this.props.blog.comments) {
            return null;
        }
        return Object.entries(this.props.blog.comments).map(([commentId, comment]) => {
            return (
                <div key={commentId} className="comment">
                    <a className="avatar" href={`mailto:${comment.user.email}`}>
                        <img className="image mini" src={comment.user.imageUrl} alt={comment.user.userName}/>
                    </a>
                    <div className="content">
                        <a href={`mailto:${comment.user.email}`} className="author">{comment.user.userName}</a>
                        <div className="metadata">
                            <span className="date">{getMetaInfo(comment.timestamp)}</span>
                        </div>
                        <div className="text">
                            <p>{comment.body}</p>
                        </div>
                        <div className="actions">
                            <a className="reply" onClick={() => this.onReplyClick(commentId)}>Reply</a>
                            <a className="reply" onClick={() => this.onDeleteClick(commentId)}>Delete</a>
                        </div>
                    </div>
                    <div className="comments">
                        <div className={(this.state.replyFor !== commentId)? 'hidden': ''}>
                            <CommentForm form={`replyForm-${commentId}`} onSubmit={(val) => this.onReplySubmit(val, commentId)} buttonText="Add Reply" />
                        </div>
                        {this.renderReplies(comment, commentId)}
                    </div>
                </div>
            )
        })

    };

    onCommentSubmit = (formValue) => {
        if (!this.props.auth.isSignedIn) {
            this.setState({showModal:true});
        } else {
            let id;
            if (!this.props.blog.comments.hasOwnProperty(1)) {
                id = 1;
            } else {
                id = Math.max(...Object.keys(this.props.blog.comments)) + 1;
            }
            this.props.firestore.set(
                {collection: "blogs", doc: this.props.blogId},
                {
                    ...this.props.blog, comments: {
                        ...this.props.blog.comments,
                        [id]: {
                            user: this.props.auth.userProfile,
                            timestamp: {seconds: Date.now() / 1000},
                            replies: [],
                            body: formValue.comment
                        }
                    }
                }
            )
        }
    };

    onReplySubmit = (formValue, commentId) => {
        if (!this.props.auth.isSignedIn) {
            this.setState({showModal:true});
        } else {
            let id;
            if (this.props.blog.comments[commentId].replies.length === 0) {
                id = 1;
            } else {
                id = Math.max(..._.chain(this.props.blog.comments[commentId].replies).map('id').value()) + 1;
            }

            this.props.firestore.set(
                {collection: "blogs", doc: this.props.blogId},
                {
                    ...this.props.blog, comments: {
                        ...this.props.blog.comments,
                        [commentId]: {
                            ...this.props.blog.comments[commentId],
                            replies: [
                                ...this.props.blog.comments[commentId].replies,
                                {
                                    id: id,
                                    user: this.props.auth.userProfile,
                                    timestamp: {seconds: Date.now() / 1000},
                                    body: formValue.comment
                                }
                            ]
                        }
                    }
                }
            );
            this.setState({replyFor: 'none'})
        }
    };

    onReplyClick = (commentId) => {
        if (!this.props.auth.isSignedIn) {
            this.setState({showModal: true});
        } else {
            if (this.state.replyFor === commentId) {
                this.setState({replyFor: 'none'})
            } else {
                this.setState({replyFor: commentId})
            }
        }
    };

    renderCommentForm = () => {
        const showCommentForm = this.state.replyFor === null;
            return (
                <React.Fragment>
                    <div className={(showCommentForm)? '': 'hidden'}>
                        <CommentForm form="commentForm" onSubmit={this.onCommentSubmit} buttonText="Add Comment" />
                    </div>
                    <button
                        className={`ui blue labeled submit icon button ${(showCommentForm)? 'hidden':''}`}
                        onClick={() => {this.setState({replyFor: null})}}
                    >
                        <i className="icon edit"/>Add Comment
                    </button>
                </React.Fragment>
            )
    };

    showModal = () => {
        if (this.state.showModal) {
            window.scroll(0,0);
            return <Modal title="Hey There!" content="You need to signIn to continue" action={<GoogleAuth/>} onDismiss={() => this.setState({showModal: false})}/>
        }
    };


    render() {
        return (
            <div className="ui comments">
                <h3 className="ui dividing header">Comments</h3>
                {this.renderComments()}
                {this.showModal()}
                {this.renderCommentForm()}
            </div>
        )
    }
}

export default withFirestore(Comments);