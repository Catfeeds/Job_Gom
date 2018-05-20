/* css */
import React, {Component} from 'react';
import NoAuth from 'components/BlankPage';
import { Switch, Route } from 'react-router-dom';
import {page} from 'util/phpCommon';

import VideoManage from './VideoManage.js';
import VideoUpdate from './VideoUpdate.jsx';

class VideoIndex extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        if(page.approve_status != 1) {
            return (
                <NoAuth tag={'noLimit'} />
            )
        } else {
            return (
                    <Switch>
                        <Route exact path={'/portal/videoManage'} component={VideoManage} />
                        <Route path={'/portal/videoManage/update/:id'} component={VideoUpdate} />
                    </Switch>
            )
        }
    }
}

export default VideoIndex;
