import React, {Component} from 'react';
import {
    Route,
    Link,
    Prompt,
    Redirect,
    Switch

} from 'react-router-dom';

import {store, history} from 'store';
import 'css/components/dialog.scss';
import Nav from 'components/Nav';
import Header from 'components/Header';
import Footer from 'components/footer';
import userAuth from 'util/userAuth';
import {indexRoutes} from '../../router/navigation.jsx';
import { page } from 'util/phpCommon.js';
import VideoUploader from 'reduxs/container/VideoUploader';

class App extends Component {
    constructor(props) {
        super(props);
        this._initNav();
    }

    _initNav(){
        let applyStatus = page.approve_status;
        let delRoteIndex = -1;
        if (applyStatus == 1) {
            delRoteIndex = indexRoutes.findIndex(v=>v.path == '/portal/auth');
        }else{
            delRoteIndex = indexRoutes.findIndex(v=>v.path == '/portal/userinfo');
        }
        delRoteIndex > -1 && indexRoutes.splice(delRoteIndex,1);
    }

    componentDidMount() {
        userAuth(this.props.history);
    }

    render() {
        let  jsPath = page.jsPath;
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

                <div className="footer">
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;
