import React from "react";
import {Router, Route} from "react-router-dom";

import history from '../history';
import Header from './Header';
import HomeScreen from './HomeScreen/HomeScreen';
import Footer from "./Footer";
import BlogView from "./BlogView/BlogView";
import ComingSoon from "./ComingSoon";
import AboutMe from "./AboutMe";

const App = () => {
    return (
        <div style={{backgroundColor:"white"}}>
            <Router history={history}>
                <Header/>
                <div className="ui container" style={{backgroundColor: "white"}}>
                    <Route path="/" exact component={HomeScreen}/>
                    <Route path="/tech" exact component={ComingSoon}/>
                    <Route path="/personal" exact component={ComingSoon}/>
                    <Route path="/about-me" exact component={AboutMe}/>
                    <Route path="/subscribe" exact component={ComingSoon}/>
                    <Route path="/blog/:id" exact component={BlogView}/>
                </div>
                <Footer/>
            </Router>
        </div>
    );
};

export default App;