import React from "react";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";

import MainPanel from './MainPanel/MainPanel'
import SidePanel from "./SidePanel/SidePanel";
import {headerUpdate} from "../../actions";

class HomeScreen extends React.Component {

    componentDidMount() {
        this.props.headerUpdate({headerImg: null});
    }


    render() {
        return (
            <div className="ui three column stackable padded internally grid">
                <Helmet>
                    <title>PriteeshPosts | Home</title>
                    <meta name="description" content="This is a completely self made blogging website created by Priteesh Goyal and it covers topics that interests him like anything tech be it hardware or software, electric cars and cricket"/>
                    <meta name="keywords" content="priteesh, goyal, blog, personal blog, personal, tech, electric cars, electric, cricket, cars, tesla, amd, intel"/>
                </Helmet>
                <div className="twelve wide column">
                    <MainPanel/>
                </div>
                <div className="four wide column">
                    <SidePanel/>
                </div>
            </div>
        )
    }
}

export default connect(null, {headerUpdate})(HomeScreen);