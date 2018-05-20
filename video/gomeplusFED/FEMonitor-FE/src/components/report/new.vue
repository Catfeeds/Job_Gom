<template>
	<div class="content-new">
		<h3>新建报表</h3>
		<hr>
		<form class="form-horizontal">
			<div class="form-group form-project">
				<label for="chooseBtn" class="control-label">所属项目</label>
				<button type="button" @click.stop="open('project')" class="btn btn-default dropdown-toggle" id="chooseBtn">
				    {{chooseText}}
				    <span class="caret"></span>
				</button>
				<div class="menu-con" v-show="openPro">
					<div class="search-con">
						<input type="search" name="search" @keyup="filter('project') | debounce 500" v-model="keywordPro" placeholder="搜索" class="search-input" autocomplete="off">
						<i class="search-icon" v-show="!keyword"></i>
						<i class="clear-icon" v-show="keyword" @click="remove()"></i>
					</div>
					<ul v-show="projects" class="projects-list">
					    <li v-for="item in projects"><a @click="choose('project', item)">{{item.TN}}</a></li>
					</ul>
				</div>
			</div>
			<div class="form-group form-members">
				<label for="chooseMember" class="control-label">报表成员</label>
				<button type="button" @click.stop="open('member')" class="btn btn-default dropdown-toggle" id="chooseMember" :disabled="!belongTo">
				    添加报表成员
				    <span class="caret"></span>
				</button>
				<div class="menu-con" v-show="openMem">
					<div class="search-con">
						<input type="search" name="search" @keyup="filter('member') | debounce 500" v-model="keywordMem" placeholder="搜索" class="search-input" autocomplete="off">
						<i class="search-icon" v-show="!keyword"></i>
						<i class="clear-icon" v-show="keyword" @click="remove()"></i>
					</div>
					<ul v-show="members" class="members-list">
					    <li v-for="item in members" >
					    	<label class="member-name"><input @click="choose('member', item)" type="checkbox" class="member-name" v-model="item.checked">{{item.UN}}</label>
					    </li>
					</ul>
					<div class="bottom-form member-btn clearfix">
						<a class="btn btn-success btn-xs">关闭</a>
					</div>
				</div>
			</div>
			<div class="form-group members-con" v-show="memArray">
				<ul>
					<li v-for="item in memArray"><p>{{item.UN}}</p><span @click="removeMem(item)">X</span></li>
				</ul>
			</div>
		  	<div class="form-group">
		    	<label for="name" class="control-label">报表名称</label>
			    <div class="group-col">
			      	<input type="email" class="form-control" id="name" v-model="reportInfo.name" placeholder="请填写报表名称">
			    </div>
		  	</div>
			<div class="form-group">
			    <label for="description" class="control-label">报表描述</label>
			    <div class="group-col">
			      	<textarea class="form-control" rows="4" id="description" v-model="reportInfo.desc"></textarea>
			    </div>
			</div>
			<div class="form-group">
				<p class="control-label">报表头像</p>
				<div class="group-col">
					<label  for="avatar">
						<a class="btn btn-avatar">
							<i class="fa fa-paperclip"></i>
							<span>选择文件</span>
						</a>
					</label>&nbsp;
					<input class="js-group-avatar-input hidden" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" name="group[avatar]" id="avatar" @change="upload($event)">
					<span class="file_name js-avatar-filename">{{fileName}}</span>
				</div>
			</div>
		</form>
		<div class="bottom-form">
			<input type="submit" value="创建报表" class="btn btn-success" @click="creatReport()" :class="{disabled: !reportInfo.name || !reportInfo.desc || !belongTo || !memArray.length}" :disabled="(!reportInfo.name || !reportInfo.desc || !belongTo || !memArray.length)">
			<a class="btn btn-default cancel" v-link="{name: 'listReport'}">取消</a>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import actions from 'actions';
import store from 'store';
import { upload } from 'utils/user.js';
import {
	$
} from 'utils/dom.js';
export default {
	name: 'reportNew',
	data() {
		return {
			openPro: false,
			openMem: false,
			chooseText: '请选择',
			projects: [],
			members: [],
			belongTo: false,
			reportInfo: {},
			reportData: {},
			keywordPro: '',
			keywordMem: '',
			fileName: '',
			selectMem: {},
			memArray: [],
			idArr: []
		};
	},
	ready() {
		$('html')[0].on('click', (e) => {
			if (!e.target.classList.contains('member-name') && !e.target.classList.contains('search-input') && !e.target.classList.contains('search-icon') && !e.target.classList.contains('clear-icon')) {
				this.openPro = false;
				this.openMem = false;
			};
		});
		this.projectList();
	},
	methods: {
		open(type) {
			if (type === 'project') {
				this.openPro = !this.openPro;
				this.openMem = false;
			} else {
				this.openMem = !this.openMem;
				this.openPro = false;
			}
		},
		filter(type) {
			this.memberList(this.keywordMem);
			if (type === 'project') {
				this.projectList(this.keywordPro);
			} else {
				this.memberList(this.keywordMem);
			}
		},
		choose(type, item) {
			if (type === 'project') {
				this.chooseText = item.TN;
				this.reportInfo.parentProject = item.ID;
				this.belongTo = true;
				this.selectMem.typeId = item.ID;
				this.memberList();
				this.memArray = [];
			} else {
				if (!item.checked) {
					this.memArray.push(item);
				} else {
					for (let i in this.memArray) {
						this.memArray[i] === item ? this.memArray.splice(i, 1) : '';
					}
				}
				item.checked = !item.checked;
			}
		},
		remove() {
			this.keyword = '';
		},
		removeMem(item) {
			for (let i in this.memArray) {
				if (this.memArray[i] === item) {
					this.memArray.splice(i, 1);
				}
			};
			for (let i in this.members) {
				if (this.members[i] === item) {
					this.members[i].checked = false;
				}
			}
		},
		projectList(data) {
			this.$http({
				url: 'project',
				method: 'get',
				params: {
					limit: 0,
					filter: data
				}
			}).then((res) => {
				return res.json();
			}).then((res) => {
				this.projects = res.data.result;
			});
		},
		memberList(data) {
			if (data) {
				this.selectMem.filter = data;
			}
			this.selectMem.type = 'project';
			this.selectMem.limit = 0;
			this.$http({
				url: 'userright',
				method: 'get',
				params: this.selectMem
			}).then((res) => {
				return res.json();
			}).then((res) => {
				this.members = res.data.result;
				for (let i in this.members) {
					Vue.set(this.members[i], 'checked', false);
				}
			});
		},
		creatReport() {
			for (let i of this.memArray) {
				this.idArr.push(i.UI);
			}
			this.reportInfo.member = this.idArr.join(',');
			let map = ['parentProject', 'name', 'desc', 'avatar', 'layout_id', 'member'];
			for (let i of map) {
				if (this.reportInfo[i]) {
					this.reportData[i] = this.reportInfo[i];
				}
			}
			this.$http({
				url: 'report',
				method: 'POST',
				body: this.reportData
			}).then((res) => {
				this.chooseText = '请选择';
				this.fileName = '';
				this.reportInfo = {};
				this.$router.go({
					name: 'listReport'
				});
				actions.alert(store, {
					show: true,
					msg: '创建报表成功',
					type: 'success',
					dismissible: true,
					delay: 2000
				});
			});
		},
		upload(ev) {
			let file = ev.target.files[0];
			this.fileName = file.name;
			upload(file, (res) => {
				this.reportInfo.avatar = res.data.result;
			});
		}
	}
};
</script>
<style scoped>
	ul li {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.form-project,.form-members{
		position: relative;
	}
	#chooseBtn,#chooseMember{
		height: 35px;
		text-align: left;
		padding: 0 0 0 15px;
		width: 200px;
		margin-left: 25px;
		color: #adadad;
	}
	#chooseBtn{
		height: 35px;
		text-align: left;
		padding: 0 0 0 15px;
		width: 200px;
		margin-left: 25px;
		color: #adadad;
	}
	.caret{
		float: right;
		margin: 8px;
	}
	.menu-con {
		display: block;
	    position: absolute;
	    top: 100%;
	    left: 90px;
	    background-color: #fff;
	    border-radius: 3px;
	    width: 210px;
	    height: auto;
	    border: 1px solid rgba(0,0,0,0.1);
	    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
	    margin-top: -8px;
	    z-index: 100;
	}
	.search-input {
		display: block;
		margin: 0 auto;
		font-size: 13px;
		outline: none;
		padding-left: 10px;
		line-height: 25px;
		width: 187px;
		border: 1px solid #eaeaea;
		border-radius: 3px;
		margin-top: 10px;
	}
	.search-icon {
		position: absolute;
		right: 17px;
		top: 15px;
		color: #e7e9ed;
	}
	.search-icon:before {
	    content: "\f002";
	    font-family: FontAwesome;
	    font-weight: normal;
	    font-style: normal;
	}
	.search-icon:hover {
		cursor: pointer;
		color: #807e7e;
	}
	.clear-icon{
		position: absolute;
		right: 17px;
		top: 15px;
		color: #e7e9ed;
	}
	.clear-icon:before {
		content: "\f00d";
		font-family: FontAwesome;
		font-weight: normal;
		font-style: normal;
	}
	.clear-icon:hover {
		color: #807e7e;
		cursor: pointer;
	}
	.projects-list {
	  max-height: 140px;
	  overflow-x: hidden;
	  overflow-y: scroll;
	}
	.projects-list::-webkit-scrollbar {
	  width: 5px;
	}
	.projects-list::-webkit-scrollbar-thumb{
	  background-color: rgba(26, 133, 255, 1);
	  border-radius:10px;
	}
	.menu-con > ul{
		display: block;
		width: 100%;
		padding: 5px 0px;
		font-size: 14px;
		margin-top: 10px;
	}
	.menu-con > ul > li{
		width: 100%;
		height: 30px;
		line-height: 30px;
		cursor: pointer;
	}
	.menu-con > ul > li > a {
		display: block;
		width: 100%;
		text-decoration: none;
		color: black;
		padding-left: 12px;
	}
	.menu-con > ul > li > a:hover {
		background-color: #f4f8fe;
	}
	.members-list{
		max-height: 100px;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.members-list li{
		padding-left: 10px;
	}
	.members-list li label{
		width: 100%;
		cursor: pointer;
	}
	.members-list li label{
		width: 100%;
		cursor: pointer;
		padding-top: 0;
		padding-bottom: 0;
	}
	.members-list li label input{
		margin-right: 10px;
		margin-top: 0px;
		vertical-align: middle;
	}
	.members-list::-webkit-scrollbar {
	  width: 5px;
	}
	.members-list::-webkit-scrollbar-thumb{
	  background-color: rgba(26, 133, 255, 1);
	  border-radius:10px;
	}
	.member-btn{
		margin-top: 0;
		border-top: 1px solid #e5e5e5;
		padding: 9px;
	}
	.member-btn a{
		float: right;
		margin-right: 5px;
	}
	.members-con{
		width: 100%;
		height: auto;
		margin-bottom: 0;
	}
	.members-con ul{
		width: 100%;
		height: auto;
		margin-left: 50px;
	}
	.members-con ul li{
		float: left;
		color: #337ab7;
		border: 1px solid #ddd;
		border-radius: 5px;
		margin: 0 10px 10px 0;
		padding: 5px;
	}
	.members-con ul li:hover{
		color: #23527c;
		background-color: #eee;
	}
	.members-con ul li p{
		display: inline-block;
		margin: 0;
	}
	.members-con ul li span{
		cursor: pointer;
		margin-left: 5px;
	}
</style>
