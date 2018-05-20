import React, {Component} from 'react';
import Page from '../../components/Pager';
import SubList from './SubList';
import fetch from 'io/fetch';
import {Link} from 'react-router-dom';

class InitSubscribe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              curpage : 1,
                 data : [],
            totalPage : null
        };
       // this.onClick = this.onClick.bind(this);
        this.pager = null;
    }

    _fetchData(page){
        fetch.get('subscribe/mylist?',{
            params : {
                page : page
            },
            loading : true
        }).then((data) => {
            if(data.data.message == 'success'){
                var item = data.data.data;
                this.setState({
                    curpage : page,
                    data : item.list,
                    totalPage : item.page.page_total
                });
            }
        })
    }

    componentDidMount() {
        this._fetchData(1);
    }

    createSub(ok) {
        if(ok){
            this._fetchData(1);
            this.pager.toFirstPage(1);
        }
    }

    toNextPage(page){
        this._fetchData(page);
    }

    changeSub(ok) {
        if(ok) {
            this._fetchData(this.state.curpage);
        }
    }
    // onClick() {
    //     var param = {
    //         subscribe_id :'',
    //         name : '',
    //         image : '',
    //         description : ''
    //     }
    //     ReactDOM.render(
    //         <SubDailog
    //             title="新建订阅号"
    //             parentNam="subscribe"
    //             param={param}
    //             onSubmit={this.createSub.bind(this)}
    //             fetch= {"subscribe/add"}
    //             unClick = 'unClick'
    //         />,
    //         document.getElementById('subModifier')
    //     );
    // }

    render() {
        var param = this.state;
        var totalPage = this.state.totalPage;
        var toLink = {pathname: '/portal/subscriber/SubOption/'+ "NEW"};
        if(totalPage > 0){
            return (
                <div className="subscribe">
                    <div className='addSub'>
                        <Link to={toLink}>
                            <span className='newSub-btn' ><span>+</span>新建美号</span>
                        </Link>
                    </div>
                    <SubList
                        data = {param.data}
                        changeSub={this.changeSub.bind(this)}
                    />
                    <div id="subModifier"></div>
                    <Page
                        ref={(pager) => {this.pager = pager;}}
                        size={totalPage}
                        page={param.curpage}
                        callbackFn={this.toNextPage.bind(this)}
                    />
                </div>
            );
        }else if(totalPage == 0){
            return(
                <div className="subscribe blankPage">
                    <div className="video-Center-Container is-Table">
                        <div className="Table-Cell">
                            <div className="Center-Block">
                                <p>您还未创建过任何美号哦，快去创建吧</p>
                                <div>
                                    <a href='javascript:;'>
                                        <Link to={toLink}> <span className="btn">+新建美号</span></Link>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="subModifier"></div>
                </div>
            );
        }else{
            return <div></div>
        }
    }
}


export default InitSubscribe;
