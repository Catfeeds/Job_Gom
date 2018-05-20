<template>
	<div id="app" class="wrap-right clearfix">
		<div class="phrase-list">
			<div class="list-bg">
				<m-item :model="treeData"></m-item>
			</div>
		</div>

		<div class="phrase-form">
			<p>标题</p>
			<input type="text" value="" id="title" maxlength="{{isMsg ? 18 : 10}}" :value="workData.title" @blur="onBlurTitle" placeholder="输入分类名" v-el:title>
			<p>内容</p>
			<textarea id="desc" maxlength="200"  v-if="workData.desc && workData.desc.length > 0" @blur="onBlurDesc" rows="3" :value="workData.desc" v-el:desc></textarea>
			<textarea id="desc" maxlength="200"  v-else rows="3" disabled :value="workData.desc" @blur="onBlurDesc" v-el:desc></textarea>
			<p class="gray">创建人：{{workData.creater}}；最后操作人：{{workData.recentOperator}}</p>
			<p>操作</p>
			<div class="option">
				<a href="javascript:;" @click="addCommonMsg" :class="[classBtn, isMsg ? disabeBtn : '']">添加常用语</a>
				<a href="javascript:;" @click="addCat" :class="[classBtn, isMsg ? disabeBtn : '']">添加平级分类</a>
				<a href="javascript:;" @click="addSubCat" :class="[classBtn, isMsg ? disabeBtn : '']">添加子分类</a>
				<div class="btn-box">
					<a href="javascript:;" @click="deleteNode" class="btn">删除<em class="icon-cha"></em></a>
					 <a href="javascript:;" @click="moveDown" class="btn">下移<em class="icon-down"></em></a>
					 <a href="javascript:;" @click="moveUp" class="btn">上移<em class="icon-up"></em></a>
				</div>
			</div>
			<div class="form-b">
				<div class="fl"><input type="file" id="file"  @change="onChangeFile" style="display:none"><a href="javascript:;" @click="importTemplate" class="btn">导入</a><a href="/venus-csh-web/template/expressionTemplate.xlsx"  class="btn">模板下载</a></div>
				<div class="fr"><a href="javascript:;" @click="cancelMsg" id="cancelBtn" class="btn">取消</a><a href="javascript:;" @click="saveMsg" class="btn">保存</a></div>
			</div>
		</div>
	</div>
</template>

<style>

</style>
<script type="text/babel">
	import TreeComponent from '../common/item.vue'
	import {Validate} from '../../base/common_validate'
	import actions from 'actions'
	import store from 'store'
	import $ from 'jquery'

	export default{
		data () {
			return {
				consts: {
					ADDCOMMONMSG: 'MSG',
					ADDSUBCAT: 'SUB',
					ADDCAT: 'CAT',
					FIRSTLEVEL: 1,
					SECONDLEVEL: 2,
					THIRDLEVEL: 3,
					MSGLEVEL: 4,
					NO_SELECT_NODE: '请先选中节点',
					DELETE_CMSG: '删除常用语，是否继续?',
					DELETE_CAT: '删除分类将删除分类下的所有内容，是否继续?',
					DELETE_LASTNODE: '不可删除最后一条记录',
					SAVE_OR_CANCEL: '您更改了常用语设置,是否保存更改? ',
					NO_MOVE: '不可移动',
					NO_MOVEFIRST: '第一条记录不可向上移动',
					NO_MOVELAST: '最后一条记录不可向下移动',
					NO_ADDSUB: '不可以增加子分类',
					NO_ADDCAT: '不可以增加分类',
					NO_ADDCMSG: '不可增加常用语'
				},
				treeData: {

				},
				workData: {
					type: -1,
					id: -1,
					title: '',
					desc: '',
					recentOperator: '',
					creater: '',
					parentId: -1,
					isSelected: false
				},
				tempData: {
					title: '',
					desc: ''
				},
				treeConfig: {
					url: 'commonLanguage/getItemTree',
					drag: true
				},
				isTitleChange: false,
				isDescChange: false,
				interval:null,
				isTitleCount: 0,
				classBtn: 'btn',
				disabeBtn: 'disable',
				currentItem: null,
				parentItem: null
			}
		},
		methods : {
			privateInitData () {
				this.workData = {
					type: -1,
					id: -1,
					title: '',
					desc: '',
					recentOperator: '',
					creater: '',
					parentId: -1,
					isSelected: false
				}
			},
			privateAutoFocus () {
				this.$els.title.focus()
			},
			privateClearInput () {
				document.querySelector('#title').value = ''
				document.querySelector('#desc').value = ''
			},
			privateCheckSelectNode () {
				return this.privateCheck(this.consts.NO_SELECT_NODE, {isTrue: this.workData.isSelected})
			},
			privateCheckLastNode () {
				if (this.currentItem != null) {
					if (this.currentItem.model.type === this.consts.FIRSTLEVEL) {
						if (this.currentItem.$parent.$children.length === 1) {
							return !this.privateCheck(this.consts.DELETE_LASTNODE, {isTrue: false})
						}
					}
				}
				return false
			},
			privateConfirm (msg, applyFunc, cancelFunc) {
				actions.confirm(store, {
					show: true,
					msg: msg,
					apply: () => {
					if (applyFunc) {
						applyFunc()
					}
				}
			})
			},
			privateConfirmChange (msg) {
				var self = this
				var _func = function () {
					self.saveMsg()
				}
				this.privateConfirm(msg, _func)
				return this;
			},
			privateCheck (msg, data) {
				if (Validate.validate(data).errors()) {
					actions.alert(store, {
						show: true,
						msg: msg
					})
					return false
				}else {
					return true
				}
			},
			refreshTree () {
				this.$http({
					url: this.treeConfig.url,
					method: 'get',
					params: {
						id: 0,
						type: 0
					}
				}).then((res) =>{
					if (this.privateCheck(res.data.message,{isTrue: res.data.result})){
						this.treeData = res.data.data
					}
					//console.log(res.data);
				}
			)
			},
			refreshTreeById (parentId, cb) {
				this.parentItem.fetchParent({
					id: this.workData.id,
					pid: parentId,
					type: this.parentItem.model.type
				},cb)
			},
			addCommonMsg () {
				// 选中节点,不是msg节点,不是新添加节点
				if (this.privateCheckSelectNode() && !this.isMsg &&
						this.privateCheck(this.consts.NO_ADDCMSG,
								{isRealNode: this.workData.id})) {

					this.$broadcast("parent-msg", {
						id: this.workData.id,
						handleType: this.consts.ADDCOMMONMSG,
						type: this.workData.type
					},  (thisModel, thisItem, parentItem) => {
						this.workData = thisModel
						this.workData.parentId = parentItem.model.id
						this.workData.isSelected = thisItem.isActive
						this.currentItem = thisItem
						this.parentItem = parentItem
						this.privateAutoFocus()
					});
				}
			},
			addSubCat () {
				// TODO 如果当前已经是第三级了,提示不可增加子分类
				if (this.privateCheckSelectNode() && !this.isMsg &&
					this.privateCheck(this.consts.NO_ADDSUB,
							{isRealNode: this.workData.id,
								isNotThirdLevel: this.workData.type})) {
					this.$broadcast("parent-msg", {
						id: this.workData.id,
						type: this.workData.type,
						handleType: this.consts.ADDSUBCAT
					},  (thisModel, thisItem, parentItem) => {
						this.workData = thisModel
						this.workData.parentId = parentItem.model.id
						this.workData.isSelected = thisItem.isActive
						this.currentItem = thisItem
						this.parentItem = parentItem
						this.privateAutoFocus()


						// console.log("addSubCat", this.workData.type)
					});
				}
			},
			addCat () {
				if (this.privateCheckSelectNode() && !this.isMsg &&
					this.privateCheck(this.consts.NO_ADDCAT,
							{isRealNode: this.workData.id})) {

					this.$broadcast("parent-msg", {
						id: this.workData.id,
						type: this.workData.type,
						handleType: this.consts.ADDCAT
					}, (thisModel, thisItem, preItem) => {
						this.workData = thisModel
						this.workData.parentId = thisItem.$parent.model.id
						this.workData.isSelected = thisItem.isActive
						this.currentItem = thisItem
						this.parentItem = preItem.$parent
						this.privateAutoFocus()

					});
				}
			},
			importTemplate () {
				$('#file').click()
			},
			deleteNode () {
				var msg = ''
				if (this.privateCheckSelectNode()) {
					if (this.privateCheckLastNode()) {
						return
					}
					if (this.workData.type == this.consts.MSGLEVEL) {
						msg = this.consts.DELETE_CMSG
					} else {
						msg = this.consts.DELETE_CAT
					}
					if (this.workData.id < 0) {
						actions.confirm(store, {
							show: true,
							msg: msg,
							apply: ()=>{
								this.cancelMsg()
							}
						})
					}else {
						actions.confirm(store, {
							show: true,
							msg: msg,
							apply: ()=>{
								this.$http({
									url: 'commonLanguage/deleteItem',
									body: {
										id: this.workData.id,
										type: this.workData.type,
										operator_id: store.state.user_info.operator_id // TODO 改成操作员
									},
									method: 'post'
								}).then((res)=>{
									if (this.privateCheck(res.data.message,{isTrue: res.data.result})){
										this.refreshTreeById(this.workData.parentId)
										this.privateClearInput()
									}
								}
							)}
						})
					}
				}
			},
			moveUp () {
				var self = this
				if (this.privateCheckSelectNode()) {
					if (this.workData.id < 0) {
						actions.alert(store, {
							show: true,
							msg: this.consts.NO_MOVE
						})
						return false
					}else {
						// 第一条记录不可向上移动
						if (!this.privateCheck(this.consts.NO_MOVEFIRST,
										{isTrue:!(this.parentItem.$children.length > 0 &&
								this.parentItem.$children[0].model.id === this.workData.id)})) {
							return
						}
						this.$http({
							url: 'commonLanguage/sortItem',
							method: 'post',
							body: {
								id: this.workData.id,
								direction: 'upward',
								operator_id: store.state.user_info.operator_id
							}
						}).then((res) =>{
							if (this.privateCheck(res.data.message,{isTrue: res.data.result})){
								var mId = this.workData.id
								var mType = this.workData.type
								this.refreshTreeById(this.workData.parentId, function() {
									var cItem = self.currentItem.findItem(self.currentItem,
											mId,
											mType)
									cItem.selectNode()
								})
							}
						})
					}
				}
			},
			moveDown () {
				var self = this
				if (this.privateCheckSelectNode()) {
					if (this.workData.id < 0) {
						actions.alert(store, {
							show: true,
							msg: this.consts.NO_MOVE
						})
						return false
					}else {
						if (!this.privateCheck(this.consts.NO_MOVELAST,
										{isTrue: !(this.parentItem.$children.length > 0 &&
								this.parentItem.$children[this.parentItem.$children.length - 1].model.id ===
								this.workData.id)})) {
							return
						}
						this.$http({
							url: 'commonLanguage/sortItem',
							method: 'post',
							body: {
								id: this.workData.id,
								direction: 'down',
								operator_id: store.state.user_info.operator_id
							}
						}).then((res) =>{
							if (this.privateCheck(res.data.message,{isTrue: res.data.result})){
								var mId = this.workData.id
								var mType = this.workData.type
								this.refreshTreeById(this.workData.parentId, function() {
									var cItem = self.currentItem.findItem(self.currentItem,
											mId,
											mType)
									cItem.selectNode()
								})
							}
						})
					}
				}
			},
			cancelMsg () {
				var self = this
				if (this.workData.id === -1) {
					this.$broadcast("remove-msg", {
						id: this.workData.id,
						type: this.workData.type
					},  () => {
						self.privateInitData()
					});
				}else {
					document.querySelector('#title').value = this.workData.title || ""
					document.querySelector('#desc').value = this.workData.desc || ""
				}
			},
			saveMsg () {
				if (this.privateCheckSelectNode()) {
					// console.log('saveMsg...', this.workData)
					this.$http({
						url: 'commonLanguage/addItem',
						method: 'post',
						body: {
							id: this.workData.id,
							title: document.querySelector('#title').value.trim(),
							desc: document.querySelector('#desc').value.trim(),
							parentId: this.workData.parentId,
							operator_id: store.state.user_info.operator_id,
							type: this.workData.type
						}
					}).then((res) => {
						if (this.privateCheck(res.data.message,{isTrue: res.data.result})){
							this.refreshTreeById(this.workData.parentId)
							this.privateClearInput()
							this.privateInitData()
						}
					})
				}
			},
			onBlurTitle (ev) {
				if (document. querySelector('#title').value.trim() == "" &&
						document. querySelector('#desc').value.trim() == ""
				) {
					return
				}
				if (ev.relatedTarget && ev.relatedTarget.id === 'cancelBtn') {
					return
				}
				var msg = this.consts.SAVE_OR_CANCEL
				if (this.workData.type === this.consts.MSGLEVEL) {
					if (ev.relatedTarget === null || ev.relatedTarget.id != "desc") {
						if (this.workData.title.trim() != this.$title.value.trim()
								|| this.workData.desc.trim() != document. querySelector('#desc').value.trim()){
							this.privateConfirmChange(msg).privateAutoFocus()
							return
						}
					}
				}else {
					if (this.privateCheckSelectNode() && this.workData.title.trim() != this.$title.value.trim()){
						this.privateConfirmChange(msg).privateAutoFocus()
						return
					}
				}
			},
			onBlurDesc (ev) {
				if (ev.relatedTarget && ev.relatedTarget.id === 'cancelBtn') {
					return
				}
				var msg = this.consts.SAVE_OR_CANCEL
				if (ev.relatedTarget === null || ev.relatedTarget.id != "title") {
					if (this.workData.desc.trim() != document.querySelector('#desc').value.trim() ||
							this.workData.title.trim() != this.$title.value.trim()){
						this.privateConfirmChange(msg).privateAutoFocus();
						return
					}
				}
			},
			onChangeFile () {
				var formData = new FormData();
				formData.append("formData", document.querySelector('#file').files[0]);
				formData.append("operator_id", store.state.user_info.operator_id)
			   // console.log(formData)
				this.$http({
					url: 'commonLanguage/importItem',
					method: 'post',
					body: formData
				}).then((res) => {
					if (this.privateCheck(res.data.message,{isTrue: res.data.result})){


						this.refreshTree()
					}
					// this.treeData = res.data.data
				   // console.log(res.data);
				})
			}
		},
		events: {
			'child-msg': function (msg, thisItem) {
				this.tempData = msg
				this.workData = msg
				this.currentItem = thisItem
				this.parentItem = thisItem.$parent
				this.privateAutoFocus()
			},
			'drag-msg': function(dragModel, thisModel, dragItem, thisItem) {
				var nId,nPid;
				var catType = thisModel.type != this.consts.MSGLEVEL
				if (catType) {
					nId = -1
					nPid = thisModel.id
				}else {
					nId = thisModel.id
					nPid = thisModel.parentId
				}
				this.$http({
					url: 'commonLanguage/moveItem',
					method: 'post',
					body: {
						old_position: {
							parentId: dragModel.parentId,
							id: dragModel.id,
							type: dragModel.type
						},
						new_position: {
							parentId: nPid,
							id: nId,
							type: thisModel.type
						},
						operator_id: store.state.user_info.operator_id
					}
				}).then((res) => {
					if (this.privateCheck(res.data.message,{isTrue: res.data.result})){
						if (catType) {
							this.refreshTreeById(thisModel.id)
						}else {
							this.refreshTreeById(thisModel.parentId)
						}

						if (dragItem) {
							dragItem.$destroy(true)
						}
						this.privateClearInput()
						this.privateInitData()
					}
				})
			}
		},
		created () {
			this.refreshTree()
		},
		ready () {
			this.$title = this.$els.title

		},
		computed: {
			isMsg () {
				return this.workData.type &&
					this.workData.type === this.consts.MSGLEVEL ? true : false
			}
		},
		components: {
			'm-item': TreeComponent
		}
	}
</script>
