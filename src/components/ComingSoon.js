import React from "react";
import {Link} from "react-router-dom";

export default () => {
    return (
        <div className="ui header huge center aligned segment">
            <h1 className="ui header huge">Coming Soon!</h1>
            <div className="sub header">
                Probably I just forgot to upload this! Check it in sometime!
            </div>
            <Link to="/subscribe" className="ui button inverted primary">Subscribe to know when this page is available and a lot's more fun content!</Link>
        </div>
    )
}