import React from "react";
import {connect} from 'react-redux';

import {headerUpdate} from "../actions";

class AboutMe extends React.Component {

    componentDidMount() {
        this.props.headerUpdate({headerImg: '/wallpaper.png', title: "About Me"});
    }

    render() {
        return (
            <div className="ui text container" style={{marginTop:"60px", marginBottom:"60px"}}>
                <h3>Hey there!</h3>
                <br/>
                <p>
                    I am Priteesh Goyal, 23 and currently working as a software engineer in Arcesium, a global financial
                    technology firm. My home town is a small city called Roorkee (popularly known as the home of
                    IIT Roorkee) in Uttarakhand and I currently work in Hyderabad.
                </p>
                <p>
                    Although I belong to Roorkee, I was born in Sevagram (Maharashtra) and I have spent most of my childhood in the tropical country of Indonesia
                    with a couple of years of schooling in Dehradun. Then I did my graduation in Computer Science and Engineering from Punjab Engineering College, Chandigarh.
                </p>
                <p>
                    I am very interested in any latest technology be it hardware or software. I also closely follow electric vehicles
                    and basically anything that Elon Musk is into! I also dream of owning a Tesla whenever it is launched in India(hopefully soon!!).
                    And similar to almost every Indian kid born in the late 90s, I absolutely love playing and following cricket.
                </p>
                <p>
                    I am very new to writing and with this website, I attempt to share my thoughts about things that I am interested in!
                </p>
                <p>
                    If you wish to get in touch with me, give any feedback or suggestions on the content or just to say Hi!,
                    you can reach out to me by clicking on any of the social media icons given below this page.
                    I would really appreciate any form of feedback!
                </p>
            </div>
        )
    }

}

export default connect(null, {headerUpdate})(AboutMe);