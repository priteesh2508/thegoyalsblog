import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import "../stylesheets/mashead.css"

import GoogleAuth from "./GoogleAuth";

class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {hideHeader: true};
        this.mastHeadRef = React.createRef();
    }

    onVisible = (isVisible) => {
        this.setState({hideHeader: isVisible})
    };

    async componentDidMount() {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio >= 0.2) {
                    this.onVisible(true);
                } else {
                    this.onVisible(false);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.2
            }
        );

        if (this.mastHeadRef.current) {
            observer.observe(this.mastHeadRef.current);
        }
    }

    renderMastHead = () => {
        const title = (this.props.header.title) ? this.props.header.title : "PriteeshPosts";
        return (
            <div
                ref = {this.mastHeadRef}
                className={`ui fluid ${(this.props.header.inverted === false)? '' : 'inverted'} vertical masthead center aligned segment`}
                style={(this.props.header.headerImg)? {background:"url(" + this.props.header.headerImg + ") center no-repeat"}: {background:"url(/wallpaper.png) center no-repeat"}}
            >
                <div className="ui container">
                    <div className={`ui large ${(this.props.header.inverted === false)? '' : 'inverted'} secondary pointing menu`} style={{backgroundColor: "dark-grey"}}>
                        <Link to="/" className="item">
                            Home
                        </Link>
                        <Link to="/tech" className="item">Tech</Link>
                        <Link to="personal" className="item">Personal</Link>
                        <Link to="/about-me" className="item">
                            About Me
                        </Link>
                        <div className="right item">
                            <GoogleAuth/>
                        </div>
                    </div>
                </div>

                <div className="ui text container">
                    <Link to="/"><h1 className={`ui ${(this.props.header.inverted === false)? '' : 'inverted'} header`}>
                        {title}
                    </h1></Link>
                    <h2>A deep dive into my brain's weird wirings!</h2>
                </div>
            </div>
        );
    };

    renderStickHeader = () => {
        return (
            <div className={`ui inverted top large fixed menu relaxed ${(this.state.hideHeader)? 'hidden': ''}`} style={{position: "sticky", top:"0", zIndex:"10"}}>
                <div className="ui container">
                    <div className="item">
                        <Link to="/">
                            <h3 className="item">PriteeshPosts</h3>
                        </Link>
                    </div>
                    <Link to="/" className="item">
                        Home
                    </Link>
                    <Link to="/tech" className="item">Tech</Link>
                    <Link to="personal" className="item">Personal</Link>
                    <Link to="/about-me" className="item">
                        About Me
                    </Link>
                    <div className="right item">
                        <GoogleAuth/>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return (
            <React.Fragment>
                {this.renderStickHeader()}
                {this.renderMastHead()}
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {header: state.header}
};

export default connect(mapStateToProps)(Header);