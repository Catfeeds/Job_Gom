/* css */
import 'css/page/search/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchHistoryList from './searchHistoryList';
import {page} from 'util/phpCommon';
import Confirm from 'components/confirm';
import toast from 'components/toast';

class SearchPage extends React.Component {
	constructor(props) {
		super(props)
		this.handleFetchLocalHistoryData = ::this.handleFetchLocalHistoryData;
		this.handleTextInput = ::this.handleTextInput;
		this.handleClearHistorySearch = this.handleClearHistorySearch.bind(this);
		this.handleClearInput = this.handleClearInput.bind(this);
		this.handleSetKeyWord = ::this.handleSetKeyWord;
		this.state = {
			keyword: '',
			data: this.handleFetchLocalHistoryData()
		};
	}
	handleClearInput() {
		document.querySelector('#search_input').value = '';
		document.querySelector('.search-del-icon').style.display = 'none';
		this.setState({
			keyword: ''
		});
	}
	handleSetKeyWord(keyword){
		this.setState({
			keyword: keyword
		})
		setTimeout(()=>{
			this.handleSearch();
		}, 100);

	}
	handleFetchLocalHistoryData() {
		let searchHistory = localStorage.getItem('gm~sh');
		if (searchHistory != null) {
			return JSON.parse(searchHistory);
		} else {
			localStorage.setItem('gm~sh', JSON.stringify([]));
			return [];
		}
	}
	handleSearchCancel=()=> {
		unlockBody();
		if (this.videoContainer) {
			this.videoContainer.style.display = 'block';
		}
		document.getElementById('searchPage').style.display = 'none';
		this.handleClearInput();
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
		var add = function(id){
			searchKeyword.unshift(id);
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
	handleClearHistorySearch() {
		let that = this;
		if (this.confirm == undefined) {
			this.confirm = new Confirm({
				data:{
					msg: '确定要删除所有搜索历史吗'
				},
				ok() {
					localStorage.removeItem('gm~sh');
					that.setState({
						data: that.handleFetchLocalHistoryData()
					});
					this.cancel();
				}
			});
		}
		this.confirm.open();
	}
	handleTextInput(e) {
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
	componentDidMount() {
		this.videoContainer = document.getElementById('videoContainer');
		if (this.videoContainer) {
			this.videoContainer.style.display = 'none';
		}
	}
	render() {
		let searchActive = 'search-btn';
		let searchHisTitle = {};
		if (this.handleFetchLocalHistoryData().length === 0) {
			searchActive = 'search-btn searchInActive';
			searchHisTitle = {
				display: 'none'
			};
		}
		return (
		<div className="search_box">
				<div className="search_module fixed_search" id="search_container">
					<div className="search_bar">
						<div className="search">
							<form action="javascript:void 0;" onSubmit={this.handleSearch}>
								<div className="search_input_bar">
									<input id="search_input" type="search" placeholder="搜索" onChange={this.handleTextInput} />
									<i className="icon-17 search-icon"></i>
									<i className="icon-26 search-del-icon" onClick={this.handleClearInput}></i>
								</div>
								<div className="search-cancel" onClick={this.handleSearchCancel}>取消</div>
							</form>
						</div>
					</div>
					<div className="search-show">
						<div className="search-history-container">
							<div className="search-history-name" style={searchHisTitle}>
								搜索历史
							</div>
							<div className="search-history-name-container">
								<SearchHistoryList searchHistoryList={this.state.data} handleSetKeyWord={this.handleSetKeyWord} />
							</div>
						</div>
						<div className={searchActive}>
							<a href="javascript:;" className="clear-btn" onClick={this.handleClearHistorySearch}><i className="icon-27"></i>清空搜索历史</a>
						</div>
					</div>
				</div>
		</div>
		);
	}
}

function lockBody() {
	$('html,body').css({
		height: "100%",
		overflow: "hidden"
	});
}

function unlockBody() {
	$('html,body').css({
		height: "auto",
		overflow: "auto"
	});
	document.getElementById('search_container').removeEventListener('touchstart', prevent);
}

function prevent(e) {
	if (e.target.className === 'search_module fixed_search') {
		e.preventDefault();
	}
}

window.onpageshow = function(event) {
	if (event.persisted) {
		window.location.reload(true);
	}
}

export default function () {
	let div = '<div id="searchPage"></div>';
	let videoContainer = document.getElementById('videoContainer');
	lockBody();
	if (document.getElementById('searchPage') == undefined){
		document.body.insertAdjacentHTML('afterbegin',div);
		ReactDOM.render(
			<SearchPage />,
			document.getElementById('searchPage')
		);
	} else {
		document.getElementById('searchPage').style.display = 'block';
		if (videoContainer) {
			videoContainer.style.display = 'none';
		}
	}
	document.getElementById('search_container').addEventListener('touchstart', prevent);
}
