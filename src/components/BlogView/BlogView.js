import React from "react";
import {compose} from "redux";
import {connect} from 'react-redux';
import {withFirestore} from "react-redux-firebase";

import {headerUpdate} from "../../actions";
import BlogPanel from "./BlogPanel";
import BlogMeta from "./BlogMeta";
import {Helmet} from "react-helmet";

class BlogView extends React.Component {

    /*const demoObject = {
            author: "",
            category: "",
            likes:[],
            tags:[],
            comments={}
            timestamp: {
                seconds: 0,
            },
            title:"",
            visitCount:0
        }*/

    /*const body = "<div>
                Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.
                Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.
                Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.
                Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.
                Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.
                Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.
                Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.
                Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.
                v
                Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.
                v
                vInstead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.
                Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.
                Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.
                <img className="ui image" src="/wallpaper.png" alt="default photo"/>
                <div className="ui card">
                    There is so much to tell
                </div>
            </div>";*/

    async componentDidMount() {
        await this.props.firestore.get({collection: 'blogs', doc:this.props.match.params.id});
        this.props.firestore.setListener({collection: 'blogs', doc:this.props.match.params.id});
        this.props.headerUpdate({headerImg: this.props.blog.headerImg});
        this.props.firestore.set({collection: 'blogs', doc: this.props.match.params.id}, {...this.props.blog, visitCount: this.props.blog.visitCount+1})
        window.scroll(0,0);
    }

    componentWillUnmount() {
        this.props.firestore.unsetListener({collection: 'blogs', doc:this.props.match.params.id});
    }

    render() {
        if (!this.props.blog || !this.props.auth || this.props.auth.isSignedIn === null) {
            return <div>Loading...</div>
        }
        return (

            <div className="ui" style={{marginTop:"60px", marginBottom:"60px"}}>
                <Helmet>
                    <title>{this.props.blog.title} | ThePGblog</title>
                    <meta name="description" content={this.props.blog.shortDesc}/>
                    <meta name="keywords" content={this.props.blog.tags}/>
                </Helmet>
                <BlogPanel blog={this.props.blog}/>
                <BlogMeta blog={this.props.blog} auth={this.props.auth} id={this.props.match.params.id}/>
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    if (state.firestore.data.blogs) {
        return {
            blog: state.firestore.data.blogs[ownProps.match.params.id],
            auth: state.auth
        }
    }
    return {};
};

const enhance = compose(
    withFirestore,
    connect(mapStateToProps, {headerUpdate})
);

export default enhance(BlogView)
