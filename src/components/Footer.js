import React from "react";
import {Link} from "react-router-dom";


const Footer = () => {
    return (
        <div className="ui inverted vertical footer segment">
            <div className="ui container">
                <div className="ui center aligned inverted segment">
                    <div className="ui horizontal list relaxed inverted">
                        <a href="https://www.facebook.com/priteesh.goyal" rel='noreferrer noopener' target="_blank" className="item"><i className="facebook large icon item"/></a>
                        <a href="https://www.instagram.com/priteesh2508/" rel='noreferrer noopener' target="_blank" className="item"><i className="instagram large icon item"/></a>
                        <a href="https://twitter.com/priteesh2508" rel='noreferrer noopener' target="_blank" className="item"><i className="twitter large icon item"/></a>
                        <a href="mailto:priteesh2508@gmail.com" rel='noreferrer noopener' target="_blank" className="item"><i className="envelope outline large icon"/></a>
                    </div>
                    <div className="ui inverted divider"/>
                    <Link to="/about-me" className="ui inverted link" style={{color:"white"}}><h3>Get to know the author!</h3></Link>
                </div>
            </div>
        </div>
    )
};

export default Footer;