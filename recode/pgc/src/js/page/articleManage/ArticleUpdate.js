/**
 * [图文修改]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import 'css/page/publishArticle/index.scss';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {history} from 'store';

import Article from 'components/Article';
import ArticleService from 'api/article';
import Notification from 'components/Notification';
import {isArray} from 'util/tools';

// 面包屑导航
class Crumbs extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="crumbs">
				<Link to="/portal/articleManage">图文管理</Link>
				<span>&gt;</span>
				<b>修改图文</b>
			</div>
		);
	}
}


// 图文资料修改
class ArticleUpdate extends Component{
	constructor(props){
		super(props);
        this.params = this.props.match.params;
        this.state = {
            article_id: 0,
            tags: [],
            name: '',
            content: '',
            price_list: []
        };
	}

    componentDidMount(){
        
        this.notification = Notification();

        if (typeof this.params === 'undefined') {
            return false;
        }

        this.onGetDetail(this.params.id);
    }

    onGetDetail=(id)=> {
        let that = this;
        ArticleService.detail(id).then(ret=>{
            let data = ret.data;
            if (data.code === 1) {
                let article_id = this.props.match.params.id;
                let tags = data.data.tags || [];
                let name = data.data.name;
                let content = data.data.content;

                that.setState({
                    article_id,
                    tags,
                    name,
                    content
                });

            } else {
                that.notification.notice({
                    content: '请求失败',
                    onClose: function(){
                       that.props.history.replace('/portal/articleManage');
                    }
                });

            }
        });
    }

    makeFormData = (data)=>{
      let content = JSON.parse(data.content);
      let contentLast = content[content.length -1];

      // 修改图文的时候，编辑器会默认在最后加一个空的P标签，会影响修改的内容。
      if (contentLast.type === 'text' && contentLast.richText === '<p></p>') {
        content.splice(content.length-1,1);
      }

      return {
        article_id: this.state.article_id,
        name: data.title,
        components: JSON.stringify(content),
        labels: data.tags
      }

    }

    onUpdate=(formData)=> {
        var that = this;
        let postData = this.makeFormData(formData);
        ArticleService.update(postData).then(ret=>{
           let data = ret.data;

           
           if (data.code === 1) {
              // 修改的内容无变动，没做任何修改。
              if (data.data.notchanged == 1) {
                that.props.history.replace('/portal/articleManage');
                return false;
              }
              that.notification.notice({
                  content: <span>{'修改成功'}</span>,
                  onClose: function(){
                     that.props.history.replace('/portal/articleManage');
                  }
              });
           } else {
              if (isArray(data.message)) {
                let denyWordsTips = '内容中含有敏感词，请重新填写';
                let denyWordsData = data.data;
                let _temp = {};
                for(let k in denyWordsData){
                  _temp[k] = denyWordsTips;
                };
                that.article.pulledValidate(_temp);
                return false;
              }
               that.notification.notice({
                   content: <span>{'修改失败'}</span>,
                   onClose: function(){
                      // console.log('close 2')
                   }
               });
           }
        });
    }

	render(){

        if (this.state.article_id) {
            return (
                <div className="video-update-wrap article-update-wrap">
                    <Crumbs />
                    <Article 
                        ref={article => {this.article = article}}
                        article_id={this.state.article_id}
                        content={this.state.content}
                        tags={this.state.tags}
                        title={this.state.name}
                        history={this.props.history}
                        onSubmit={this.onUpdate}
                    />
                </div>
            );
        }
		return (
            <div></div>
        );
	}
}

export default ArticleUpdate;
