import React from "react";
import {Link} from "react-router-dom";

import PopularArticles from "./PopularArticles";
import FollowersPanel from "./FollowersPanel";

const SidePanel = () => {
    return (
        <div className="ui cards sticky segment" style={{border:"0", boxShadow: "none"}}>
            <div className="ui card" style={{border: "2px solid black"}}>
                <Link to="/subscribe" className="huge ui button" style={{color:"red"}}>
                    Subscribe now to get mail notification on every new post!
                </Link>
            </div>
            <PopularArticles/>
            <FollowersPanel/>
        </div>
    )
};

export default SidePanel;