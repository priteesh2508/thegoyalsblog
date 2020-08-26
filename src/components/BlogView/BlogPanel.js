import React from "react";
import {Parser} from "html-to-react";
import {getMetaInfo} from "../../meta";
import {Link} from "react-router-dom";


class BlogPanel extends React.Component {

    render() {
        if (!this.props.blog) {
            return <div>Loading...</div>
        }

        const body = this.props.blog.bodyJson;
        const htmlToReactParser = new Parser();
        const reactElement = htmlToReactParser.parse(body);

        return (
            <div className="ui container">
                <div className="ui center aligned header large" style={{paddingTop:"1em", paddingBottom:"1em"}}>
                    <h1 className="ui center aligned header large">{this.props.blog.title}</h1>
                    <div className="sub header">
                        By <Link to="/about-me">{this.props.blog.author}</Link>, {getMetaInfo(this.props.blog.timestamp)}
                        <br/>
                        <i className="eye icon"/> {this.props.blog.visitCount} views
                    </div>
                </div>
                <div className="ui text container">
                    <div className="ui sizer vertical segment" style={{fontSize:"16px", fontFamily: "Helvetica Neue"}}>
                        {reactElement}
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogPanel;