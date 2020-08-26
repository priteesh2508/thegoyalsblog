import React from "react";
import {connect} from 'react-redux';

import {headerUpdate} from "../actions";

class AboutMe extends React.Component {

    componentDidMount() {
        this.props.headerUpdate({headerImg: '/default-photo.jpg'})
    }

    render() {
        return (
            <div>
                About me page!
            </div>
        )
    }

}

export default connect(null, {headerUpdate})(AboutMe);