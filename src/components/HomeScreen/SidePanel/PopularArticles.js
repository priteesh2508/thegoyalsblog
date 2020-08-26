import React from "react";
import {Link} from "react-router-dom";
import _ from 'lodash';
import {connect} from "react-redux";

class PopularArticles extends React.Component {

    renderArticles() {
        const popularBlogs = this.props.popularBlogs.slice(0,5);
        return popularBlogs.map((blog) => {
            return (
                <Link key={blog.id} to={`/blog/${blog.id}`} className="item">{blog.title}</Link>
            )
        })
    }

    render() {
        return (
            <div className="ui card">
                <div className="content">
                    <div className="header">Popular Articles</div>
                </div>
                <div className="content">
                   <div className="ui list">
                       {this.renderArticles()}
                   </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        popularBlogs: _.sortBy(state.firestore.ordered.blogs, 'visitCount').reverse()
    }
};

export default connect(mapStateToProps)(PopularArticles);