/* css */
import 'css/page/search-result/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Scrollload from 'Scrollload';
import SubscriptionList from './subscriptionList';
import ContentList from './contentList';
import LiveEntry from './liveEntry';
import {page} from 'util/phpCommon';
import fetch from 'io/fetch';
import toast from 'components/toast.js';

class SearchButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: props.keyword,
            data: []
        }
    }
    handleSearchCancel() {
        // window.location.href = document.referrer;
        history.back();
    }
    handleFocus() {

    }

    handleSearch=()=> {
        let kw = this.state.keyword;
        if (kw === "") {
            toast("搜索内容不能为空",{
                position:{
                    left:'center',
                    top:'0.9rem'
                }
            });
            return;
        }
        let searchKeyword = JSON.parse(localStorage.getItem('gm~sh'));
        var index = searchKeyword.indexOf(kw);
        var add = function(k){
            searchKeyword.unshift(k);
            // 本地纪录 10 条
            let len = searchKeyword.length;
            if (len >= 10) {
                searchKeyword.splice(len - 1, 1);
            }
            localStorage.setItem('gm~sh', JSON.stringify(searchKeyword));
        };

        if (index === -1) {
            add(kw);
        } else { // 更新到最新
            searchKeyword.splice(index, 1);
            add(kw);
        }
        
        window.location.href = page.domain + 'search/index.html?keyword=' + this.state.keyword;
    }

    handleResetData=()=> {
        this.state.data = [];
    }

    handleTextInput=(e)=> {
        let kw = e.target.value;
        if (kw != "") {
            document.querySelector('.search-del-icon').style.display = 'block';
        } else {
            document.querySelector('.search-del-icon').style.display = 'none';
        }
        this.setState({
            keyword: kw.trim()
        });
    }

    handleClearInput=()=> {
        document.querySelector('#search_input').value = '';
        document.querySelector('.search-del-icon').style.display = 'none';
        this.setState({
            keyword: ''
        });
    }


    render() {
        return (
        <div className="search_box" data-id="search-box">
            <div className="search_module fixed_search">
                <div className="search_bar">
                    <div className="search">
                        <form action="javascript:void 0;" onSubmit={this.handleSearch}>
                            <div className="search_input_bar">
                                <input id="search_input" type="search" value={this.state.keyword} onChange={this.handleTextInput} placeholder="搜索" />
                                <i className="icon-17 search-icon"></i>
                                <i className="icon-26 search-del-icon" onClick={this.handleClearInput}></i>
                            </div>
                            <div className="search-cancel" onClick={this.handleSearchCancel}>取消</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

class NoDataPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let live = this.props.checkLive;
        let display = {
            display: 'block'
        };

        if (live) {
            display.display = 'none';
        }
        return (
            <div className="no-data" data-id="noData" style={display}>
                <div className="img"></div>
                <p>抱歉，没有找到相关内容</p>
            </div>
        )
    }
}
class SearchResultPage extends React.Component {
    static  OPEN = 0;
    constructor(props) {
        super(props)
        this.state = {
            keyword: this.props.keyword,
            data: [],
            page: 1,
            hasMore: true,
            subData: [],
            subSize: 0,
            conSize: 0,
            pageSize: 5,
            noDataPage: '',
            liveSwitch: false // true：打开，false：关闭
        }
        this.fetchData = ::this.fetchData;
        this.fetchSubData = ::this.fetchSubData;
        this.refresh = ::this.refresh;
    }

    async fetchData() {
        return await fetch.get('/searchImageText.json', {
            type: 'GET',
            data: {
                keyword: this.state.keyword,
                page: this.state.page,
                size: this.state.pageSize
            },
            dataType: 'json'
        })
    }
    async fetchSubData() {
        let that = this;
        return await fetch.get('/searchPublisher.json', {
            type: 'GET',
            data: {
                keyword: this.state.keyword,
                page: 1,
                size: 3
            },
            dataType: 'json'
        }).then((res)=>{
            // M2.1 增加live开关, -1:为关，0为开
            this.setState({
                liveSwitch: res.data.live_channel_show === SearchResultPage.OPEN
            });
            if (res.data.total > 0) {
                this.setState({
                    subSize: res.data.total,
                    subData: res.data.publisher
                });
            }
        })
    }

    async refresh() {
        await this.fetchData().then((res) => {
            if (res.code != 200) {
                if (this.state.page === 0) {
                    toast('网络异常，请稍后重试');
                } else {
                    this.scroolload.throwException();
                }
                return;
            }

            // M2.1增加live开关
            this.setState({
                liveSwitch: res.data.live_channel_show === SearchResultPage.OPEN
            });

            if (res.data.imageText ===0 || res.data.total === 0) {
                this.scroolload && $(this.scroolload.bottomDom).hide();
                if (this.state.sub === "") {
                    $('[data-id=conlist_container]').hide();
                    if (this.checkKeyword()) {
                        $('[data-id=noData]').hide();
                    } else {
                        $('[data-id=noData]').show();
                    }
                }
            }
            let page = this.state.page + 1;
            if (this.state.conSize === 0) {
                this.setState({
                    page: page,
                    conSize: res.data.total,
                    data: res.data.imageText
                });
            } else {
                this.setState({
                    hasMore: res.data.imageText.length > 0 && res.data.imageText.length === this.state.pageSize,
                    data: this.state.data.concat(res.data.imageText),
                    page: page,
                    conSize: res.data.total
                });
            }
            this.scroolload && this.scroolload.unLock();
        })
    }

    componentDidMount() {
        let component = this
        this.fetchSubData().then(()=>{
            this.refresh().then(()=>{
                if (this.state.conSize > 0) {
                    this.scroolload = new Scrollload(document.getElementById('root'), async function (sl) {
                        if (component.state.hasMore) {
                            await component.refresh();
                        } else {
                            sl.noData();
                        }
                    }, {
                        isInitLock: false,
                        loadingHtml: '<div class="top-line no-more"><p>加载中...</p></div>',
                        noDataHtml: '<div class="top-line no-more"><span class="line-left"></span><p>没有更多了</p><span class="line-right"></span></div>',
                        exceptionHtml: '<div class="top-line no-more clickHandler"><p>出错啦请重试</p></div>'
                    });
                    this.scroolload.container.addEventListener('click', (event)=> {
                        if ($(event.target).hasClass('clickHandler')) {
                            this.scrollload.solveException();
                        }
                    });
                }
                if (this.checkNoData()) {
                    this.setState({
                        noDataPage: <NoDataPage checkLive={this.checkKeyword()} />
                    });
                }
            })
        });
    }

    componentWillUnmount() {
        this.scroolload.destroy();
    }

    checkKeyword() {
        if (this.state.liveSwitch) {
            return /直播|live/ig.test(this.state.keyword);
        } else {
            return false;
        }
    }
    checkNoData() {
        return this.state.subSize === 0 && this.state.conSize === 0;
    }
    render() {
        let noData = this.state.subSize === 0 && this.state.conSize === 0;
        let le = this.checkKeyword() ? <LiveEntry noData={noData} /> : '';
        return (
            <div>
                <SearchButton keyword={this.props.keyword}/>
                {le}
                <SubscriptionList keyword={this.props.keyword} total={this.state.subSize} data={this.state.subData} />
                <ContentList data={this.state.data} keyword={this.props.keyword} />
                {this.state.noDataPage}
            </div>
        );
    }
}

window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload(true);
    }
}

let keyword = page.keyword;

ReactDOM.render(
    <SearchResultPage keyword={keyword} />,
    document.getElementById('root')
);

