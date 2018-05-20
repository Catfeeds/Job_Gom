import React from 'react';
import msToDuration from 'util/msToDuration';
import formatKeyword from 'util/formatKeyword';
import formatDate from 'util/formatDate';
import liveState from 'util/liveStatus';

function formatMsToDuration(obj) {
    let result = '';
    if (obj.day !== '00') {
        return `${obj.day}:${obj.hour}:${obj.min}:${obj.sec}`;
    } else if (obj.hour !== '00') {
        return `${obj.hour}:${obj.min}:${obj.sec}`;
    } else {
        return `${obj.min}:${obj.sec}`;
    }
}

class ContentRow extends React.Component {
    render() {
        let vtime = '',
            vurl = '',
            vstatus = '',
            show = {
                display: 'block'
            },
            hide = {
                display: 'none'
            },
            liveClassName = '',
            liveStyle={};
        let vtype = this.props.imageText.video_type;
        if (vtype === "1") {
            vtime = formatMsToDuration(msToDuration(this.props.imageText.length));
            vurl = '/v/' + this.props.imageText.id + ".html";
        } else if (vtype === "0") {
            vtime = "直播";
            vurl = '/s/' + this.props.imageText.id + ".html";
            vstatus = liveState(this.props.imageText.live_status);
            if (this.props.imageText.live_status === "1") { // 直播
                liveClassName = 'live';
                vstatus = '直播';
                liveStyle = {
                    position: 'absolute',
                    right: '0.12rem',
                    top: '0rem'
                };
            }
        }
        return (
            <li className="clearfix" >
                <a className="v-link" href={vurl}>
                    <div  className="v fl">
                        <img src={this.props.imageText.image} />
                        <span className="v-duration" style={vtype === "0" ? hide : show}>
                            <i>{vtime}</i>
                        </span>
                        <span className="v-status" style={vtype === "0" ? show : hide}>
                            <i className={liveClassName}></i><span style={liveStyle}>{vstatus}</span>
                        </span>
                    </div>
                    <div className="v-item">
                        <h2>
                            <div>{formatKeyword(this.props.imageText.title, this.props.keyword)}</div>
                        </h2>
                        <p>{vtype === "0" ? formatDate(this.props.imageText.start_time * 1000, 'yyyy-MM-dd hh:mm'): ''}</p>
                    </div>
                </a>
            </li>
        );
    }
}

export default class ContentList extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        var rows = [];
        this.props.data.forEach((item, index) => {
            rows.push(<ContentRow imageText={item} key={index} keyword={this.props.keyword}/>);
        });
        return (
            rows.length > 0 ?
                (<div className="search-result-conlist-container" data-id="conlist_container">
                <div className="search-result-conname">相关内容</div>
                <ul className="search-result-conlist">
                    {rows}
                </ul>
            </div>) : <div></div>
        );
    }
}