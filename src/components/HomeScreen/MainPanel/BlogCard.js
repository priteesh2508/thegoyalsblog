import React from "react";
import {Link} from "react-router-dom";
import {getMetaInfo} from "../../../meta";

class BlogCard extends React.Component {

    render() {


        const defaultImg = "./default-photo.jpg";
        const headerImg = (this.props.blog.headerImg) ? this.props.blog.headerImg : defaultImg;
        const imgAltText = (this.props.imgAltText) ? this.props.blog.imgAltText : this.props.blog.title;

        const blog = {...this.props.blog, headerImg, imgAltText };
        const meta = getMetaInfo(blog.timestamp)
        return (
            <div className="ui card fluid">
                <Link to={`/blog/${blog.id}`}>
                    <img className="ui image" src={blog.headerImg} alt={blog.imgAltText} />
                </Link>
                <Link to={`/blog/${blog.id}`} className="content">
                    <div className="header" ><h1>{blog.title}</h1></div>
                    <div className="meta">By <Link to="/about-me">{blog.author}</Link>, {meta}</div>
                    <div className="description">{blog.shortDesc}</div>
                </Link>
                <Link to={`/blog/${blog.id}`} className="extra content">
                    <i className="comments icon"/>
                    15 comments
                </Link>
            </div>
        )
    }
}

export default BlogCard;