import React from "react"
import {connect} from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import BlogCard from "./BlogCard";
import _ from "lodash";

class BlogList extends React.Component {

    renderBlogList() {
        const {blogs} = this.props;
        return blogs.map((blog) => {
            return (
                <BlogCard key={blog.id} blog={blog}/>
            )
        })
    }

    render() {
        if (!this.props.blogs) {
            return (
                <div>Loading....</div>
            )
        }
        return (
            <div className="ui cards">
                {this.renderBlogList()}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {blogs: _.sortBy(state.firestore.ordered.blogs, 'timestamp').reverse()}
};

export default compose(firestoreConnect(() => ['blogs']), connect(mapStateToProps))(BlogList);