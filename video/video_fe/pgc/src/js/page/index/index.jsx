import React, {Component} from 'react';
import {
    Route,
    Link,
    Prompt,
    Redirect,
    Switch
} from 'react-router-dom';

import {store, history} from 'store';
import Nav from 'components/Nav';
import Header from 'components/Header';
import Footer from 'components/Footer';
import AccountApply from 'page/accountApply/index';
// import userAuth from 'util/userAuth';
import {indexRoutes} from '../../router/navigation.jsx';
import { page } from 'util/phpCommon.js';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // userAuth(this.props.history);
    }

    render() {
        let  jsPath = page.jsPath;
        let applyStatus = page.approve_status;

        if (applyStatus === '') {
            return (
                <AccountApply {...this.props} />
            )
        }else{
            return  (
                <div className="main">
                    <Header {...this.props} />
                    <Nav />
                    <div id="mainContents" className="content" ref={(top) => {this.dom = top}}>
                        {
                            indexRoutes.map((route, i) => (
                                <Route key={route.path} {...route} />
                            ))
                        }
                    </div>
                    <Footer />
                </div>
            );
        }

    }
}

export default App;
