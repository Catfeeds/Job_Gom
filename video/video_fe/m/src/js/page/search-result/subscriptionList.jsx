import React from 'react';
import formatKeyword from 'util/formatKeyword';

class SubscriptionRow extends React.Component {
    handleBrokenImage(e) {
        e.target.style.display = 'none';
    }
    render() {
        var publisher = this.props.publisher;
        var url = "/sub/" + publisher.id + ".html";
        var summary = '';
        if(publisher.summary){
            summary = <div className="content">{publisher.summary}</div>;
        }
        return (
            <li className="search-result-subitem">
                <a href={url} className="clearfix">
                    <div className="avatar-wrap fl">
                        <img src={publisher.icon} onError={this.handleBrokenImage} />
                    </div>
                    <div className="content-wrap">
                        <a className="link" href={url} data-id="subname">{formatKeyword(publisher.name, this.props.keyword)}</a>
                        {summary}
                        <div className="sub-result">
                            {publisher.subscribe_num}人订阅
                        </div>
                    </div>
                </a>
            </li>
        );
    }
}

export default class SubscriptionList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    render() {
        var rows = [];
        // let datas = replaceKeyword(this.props.data, 'name', this.props.keyword);
        this.props.data.forEach((item, index) => {
            rows.push(<SubscriptionRow publisher={item} key={index} keyword={this.props.keyword} />);
        });
        let url = "/search/searchpublisher.html?keyword=" + this.props.keyword;
        let rowsSize = this.props.total > 3;
        let seeMore = rowsSize ? (<a className="search-result-submore" href={url}>查看更多 <em className="icon-23"></em></a>) : <div></div>;
        return (
            rows.length > 0 ?
            <div className="search-result-container">
                <div className="search-result-subname">订阅号</div>
                <ul className="search-result-sublist " data-id="search-result">
                    {rows}
                </ul>
                {seeMore}
            </div> : <div></div>
        );
    }
}