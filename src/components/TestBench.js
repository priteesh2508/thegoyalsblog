import React from "react";
import {Link} from "react-router-dom";


const TestBench = () => {

    return (
        <div className="ui container">
            <div className="ui center aligned header large" style={{paddingTop:"1em", paddingBottom:"1em"}}>
                <h1 className="ui center aligned header large">The motivation behind PriteeshPosts</h1>
                <div className="sub header">
                    By <Link to="/about-me">Priteesh Goyal</Link>, sometime soon
                    <br/>
                    <i className="eye icon"/> 10 views
                </div>
            </div>
            <div className="ui text container">
                <div className="ui sizer vertical segment" style={{fontSize:"16px", fontFamily: "Helvetica Neue"}}>
                    Hi there!
                </div>
            </div>
        </div>
    )
};

export default TestBench;