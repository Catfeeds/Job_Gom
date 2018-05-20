import 'css/page/publishArticle/index.scss';

import React, { Component } from 'react';
import {Link, Prompt} from 'react-router-dom';
import NoAuth from 'components/BlankPage';

import Topic from 'components/Article';
import Alert from 'components/Alert';
import pubsub from 'io/pubsub';
import { page } from 'util/phpCommon.js';
import {isArray} from 'util/tools';


// import Topic from '../../redux/container/tag';

class Success extends Component{
	constructor(props){
		super(props);

		// this._isMounted = true;
	}

	pubTabBack = () => {
		this.props.pubTabBack();
	}

  pubIconBack = () => {
		this.props.pubIconBack();
	}

	componentDidMount() {
    $('[href="/portal/publishArticle"]').off('click', this.pubIconBack);
    $('[href="/portal/publishArticle"]').on('click', this.pubIconBack);
	}

  componentWillUnmount() {
    $('[href="/portal/publishArticle"]').off('click', this.pubTabBack);
    $('[href="/portal/publishArticle"]').on('click', this.pubTabBack);

		if(location.pathname !== '/portal/publishArticle') {
			$('[href="/portal/publishArticle"]').off('click', this.pubTabBack);
			$('[href="/portal/publishArticle"]').off('click', this.pubIconBack);
		}
  }

	componentDidUpdate() {
	}

	render(){
		return (
      <div className="submit-success">
        <div className="success-icon-img"></div>
        <h3 className="success-title">发布成功</h3>
        <p className="success-detail">图文内容正在审核阶段，请耐心等待...</p>
        <div>
          <button className="btn submit-goon" onClick={this.pubTabBack}>继续发布</button>
          <Link id="submanager" className="btn submit-backs" to={"/portal/articleManage"}>前往图文管理</Link>
        </div>
      </div>
		)
	}
}


export default Success;
