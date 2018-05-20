import React, {Component} from 'react';
import {page} from 'util/phpCommon';
export default class LiveEntry extends Component {
    render() {
        let style = {
           borderBottom: "0.01rem solid #E9E9E9"
        };

        return (
            <a href="/liverecommend/index.html" className="search-live-a">
                <div className="search-live-container" style={this.props.noData ? style : {borderBottom: 'none'}}>
                        <div className="search-live"></div>
                        <div className="search-live-text">直播频道</div>
                        <div className="search-live-link icon-23"></div>
                </div>
            </a>
        );
    }
}
