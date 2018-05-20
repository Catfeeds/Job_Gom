import 'css/page/wrap/index.scss';
import 'css/components/loading-box.scss';
import 'css/page/gomeIntr/index.scss';
import React, {Component} from 'react';
import {
    Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import {store, history} from 'store';
import {loginRoutes} from 'router/navigation';
import HomePage from 'page/index/index';
import {page} from 'util/phpCommon';

import 'util/fetchApplyStatus';

let loggedIn = page.account_id > 0;

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    privateRoute = () => (
        <Route exact render={props => {
            if (loggedIn) {
                return <HomePage {...props}/>
            } else {
                window.location.href="/";
                return null;
            }
        }} />
    )

    render() {
        return (
            <Router history={history}>
                <Switch>
                    {
                        loginRoutes.map((nav) => (
                            <Route key={nav.path} {...nav} />
                        ))
                    }
                    {this.privateRoute()}
                </Switch>
            </Router>
        );
    }
}
