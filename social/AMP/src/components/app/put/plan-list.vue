<template>
  <div>
    <div class="account-set">
      <div class="set-option">
        <button class="btn btn-normal" @click.prevent="newPlan">新建投放计划</button>
        <button class="btn btn-normal" @click.prevent="start">启用</button>
        <button class="btn btn-normal" @click.prevent="stop">暂停</button>
        <button class="btn btn-normal" @click.prevent="del">删除</button>
      </div>
      <div class="set-fn">
        <div class="fn-plan"><span class="plan-title">计划名称：</span>
          <div class="ele-input">
            <input v-model="so.keyword" placeholder="请输入计划名称">
          </div>
        </div>
        <div class="fn-plan">
          <span class="plan-title">选择时间：</span>
          <el-date-picker v-model="so.startTime" type="date" style="width:130px;" placeholder="开始日期">
          </el-date-picker>
          <span class="plan-title plan-title-gray">-</span>
          <el-date-picker v-model="so.endTime" type="date" style="width:130px;" placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="fn-plan fn-plan-new"><span class="plan-title">状态：</span>
          <el-select v-model="so.state.value" style="width:130px;display:inline-block;" placeholder="全部">
            <el-option v-for="item in so.state.options" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="fn-search" @click.prevent="getList"><a href="" class="btn btn-primary">查询</a></div>
      </div>
    </div>
    <div class="amp-data">
      <div class="data-table" id="con-table-change">
        <div class="table-list">
          <div class="list-header" :class="{actived: isActived}">
            <span class="span-col-1"><em class="icon icon-select" @click="checkall"></em><i class="data-id">投放计划ID</i></span>
            <span class="span-col-2">投放计划名称</span>
            <span class="span-col-3">有效期</span>
            <span class="span-col-4">广告日预算</span>
            <span class="span-col-5">返利日预算</span>
            <span class="span-col-6">状态</span>
            <span class="span-col-7">展现数</span>
            <span class="span-col-8">点击数</span>
            <span class="span-col-9">点击率(%)</span>
            <span class="span-col-10">广告总花费</span>
            <span class="span-col-11">返利总花费</span>
            <span class="span-col-12">操作</span>
          </div>
          <div v-for="item in list" class="list-body">
            <div class="body-row" :class="{actived: item.isActived}">
              <span class="span-col-1"><em @click="checkbox(item.campaignId)" class="icon icon-select"></em><i class="data-id">{{item.campaignId}}</i></span>
              <span class="span-col-2">
                <i class="ellipsis">
                  <router-link :to="{name: 'unit', params: {id: item.campaignId}}" :title="item.name">{{item.name}}</router-link>
                </i>
              </span>
              <span style="position:relative" class="span-col-3">
                <i class="data-time" :class="{'time-more': item.schedule.length}" @mouseover="show(item.campaignId)" @mouseout="hide(item.campaignId)">{{item.startTime}}-{{item.isUnlimited==1?'不限':item.endTime}}</i>
                <em class="icon" :class="{'icon-plus':item.schedule.length}"></em>
                <div style="position:absolute" class="dialog dialog-white dialog-time" ref="dialog" v-show="item.timeMore">
                   <ul>
                     <li v-for="schedule in item.schedule"><a style="cursor:pointer;">{{schedule}}</a></li>
                   </ul>
                 </div>
              </span>
				<span class="span-col-4">{{item.adLimited==0?"不限":item.dailyAdBudget/100}}</span>
				<span class="span-col-5">{{item.rebateLimited==0?"不限":item.dailyRebateBudget/100}}</span>
              <span class="span-col-6">{{item.state==1?"暂停":(item.state==2?"有效":(item.state==3?"过期":(item.state==4?"未开始":(item.state==5?"预算用完":(item.state==6?"不在投放时间段":"余额不足")))))}}</span>
              <span class="span-col-7">{{item.impression}}</span>
              <span class="span-col-8">{{item.click}}</span>
              <span class="span-col-9">{{item.ctr}}%</span>
              <span class="span-col-10">{{item.adAmount}}</span>
              <span class="span-col-11">{{item.rebateAmount}}</span>
              <span class="span-col-12">
                <b class="operat-link">
                  <a href="" @click.prevent="modify(item.campaignId)">修改</a>
                  <a href="" @click.prevent="copy(item.campaignId)">复制计划</a>
                  <a href="" @click.prevent="newUnit(item.campaignId)">新建投放单元</a>
                </b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-pagination v-show="Math.floor(page.totalCount/page.pageSize)>0"
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      :current-page="page.currentPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="page.totalCount"
      :class="{'el-pagination-reset': true}"
      >
    </el-pagination>
    <el-dialog :title=title v-model="dialogVisible" size="tiny">
      <span v-html=body_html></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click=sureFn>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import Vue from "vue";
import actions from 'actions';
import CONST from '../../../help/CONST.js';
import Api from "../../../config/api.config";
import http from "../../../utils/http";
import Event from 'event';
import {formatDate,mixin} from 'utils/common';

export default {
  name: 'app-put-plan-list-overview',
  data() {
    return {
      so: {
        keyword: "",
        startTime: new Date(),
        endTime: new Date(),
        state: {
          options: [{
            label: "全部",
            value: "0"
          },{
            label: "暂停",
            value: "1"
          },{
            label: "有效",
            value: "2"
          },{
            label: "过期",
            value: "3"
          },{
            label: "未开始",
            value: "4"
          }],
          value: "0"
        }
      },
      list: [],
      page: {
        totalCount: 0,
        currentPage: 1,
        pageSizes: [20, 30, 50],
        pageSize: 20
      },
      dialogVisible: false,
      title : '提示',
      body_html : '',
      btn_state : ''
    };
  },
  components: {

  },
  computed: {
    campaignIds(){
      var campaignIds = [],list = this.list;
      for(var item of list){
        if(item.isActived){
          campaignIds.push(item.campaignId);
        }
      }
      return campaignIds;
    },
    isActived(){
      var isActived = true, list = this.list;
      for(var item of list){
        if(item.isActived){
          continue;
        }
        isActived = false;
        break;
      }
      return isActived;
    }
  },
  created(){
    var that = this;
    this.getList();
    Event.$off("put-save-success");
    Event.$on("put-save-success", function(){
      that.getList();
    });
  },
  methods: {
    checkbox(campaignId){
      var list = this.list;
      for(var item of list){
        if(item.campaignId == campaignId){
          item.isActived = !item.isActived;
        }
      }
    },
    checkall(){
      var list = this.list, isActived = this.isActived;
      for(var item of list){
        item.isActived = !isActived;
      }
    },

    getList(){
      var so = this.so, that = this;
      http.get("/api/campaigns", {
        params:{
          keyword: so.keyword,
          startTime: +so.startTime,
          endTime: +so.endTime,
          state: so.state.value,
          page: this.page.currentPage,
          number: this.page.pageSize
        }
      })
      .then(function(res) {
        if(res.data.code == 200){
          that.list = res.data.data.list;
          that.page.totalCount = res.data.data.totalCount;
          for(var item of that.list){
            Vue.set(item, "isActived", false);
            Vue.set(item, "timeMore", false);
            item.startTime = formatDate(item.startTime, "yyyy/MM/dd");
            item.endTime = formatDate(item.endTime, "yyyy/MM/dd");
            if(Array.isArray(item.schedule) && item.schedule.length){
              var arr = [];
              for(var schedule of item.schedule){
                var temp = [];
                for(var date of schedule){
                  temp.push(formatDate(+date, "yyyy/MM/dd"));
                }
                arr.push(temp.join("-"));
              }
              item.schedule = arr;
            }else {
                item.schedule = [];
			}
          }
        }
      })
      .catch(function(error) {
        alert("list fail");
      });
    },
    sureFn(){
      if(this.btn_state == 'start'){
        var that = this, list = this.list;
        if(!this.campaignIds.length){
          return;
        }
        http.put("/api/campaigns/status", {
          campaignIds: this.campaignIds,
          status: 1
        })
        .then(function(res) {
          if(res.data.code == 200){
            for(var id of that.campaignIds){
              for(var item of list){
                if(id == item.campaignId){
                  item.state = 2;
                  break;
                }
              }
            }
          }
        })
        .catch(function(error) {
          alert("fail");
        });
      }else if(this.btn_state == 'stop'){
        var that = this, list = this.list;
        if(!this.campaignIds.length){
          return;
        }
        http.put("/api/campaigns/status", {
          campaignIds: this.campaignIds,
          status: 0
        })
        .then(function(res) {
          if(res.data.code == 200){
            for(var id of that.campaignIds){
              for(var item of list){
                if(id == item.campaignId){
                  item.state = 1;
                  break;
                }
              }
            }
          }
        })
        .catch(function(error) {
          alert("stop fail");
        });
      }else if(this.btn_state == 'delete'){
        var that = this, list = this.list;
        if(!this.campaignIds.length){
          return;
        }
        http.delete("/api/campaigns", {
          data:{
            campaignIds: this.campaignIds
          }
        })
        .then(function(res) {
          if(res.data.code == 200){
            for(var id of that.campaignIds){
              for(var item of list){
                if(id == item.campaignId){
                  Vue.delete(list, item);
                  break;
                }
              }
            }
          }
        })
        .catch(function(error) {
          alert("fail");
        });
      }
      this.dialogVisible=false;
    },
    start(){
      var that = this, list = this.list;
      if(!this.campaignIds.length){
        return;
      }
      this.dialogVisible = true;
      this.body_html = '<h3>确定启动该投放计划吗？</h3>';
      this.btn_state = 'start';
    },
    stop(){
      var that = this, list = this.list;
      if(!this.campaignIds.length){
        return;
      }
      this.dialogVisible = true;
      this.body_html = '<h3>确定暂停该投放计划吗？</h3>';
      this.btn_state = 'stop';
    },
    del(){
      var that = this, list = this.list;
      if(!this.campaignIds.length){
        return;
      }
      this.dialogVisible = true;
      this.body_html = '<h3>确定要删除该投放计划吗？</h3><p>(删除后信息将不在本列表展示，相关数据可在数据报表查看)</p>';
      this.btn_state = 'delete';
    },
    modify(id){
      this.getData(id, (data) => {
      	actions.controlDrawer(this.$store, {
      		show: true,
      		action: 'modify',
      		type: 'plan',
      		config: data
      	});
      });
    },
    copy(id){
      this.getData(id, (data) => {
      	actions.controlDrawer(this.$store, {
      		show: true,
      		action: 'copy',
      		type: 'plan',
      		config: data
      	});
      });
    },
    newUnit(id) {
    	this.getData(id, (data) => {
    		actions.controlDrawer(this.$store, {
	    		show: true,
	    		action: 'new',
	    		type: 'unit',
	    		config: mixin({
	    			campaignId: id
	    		}, CONST.DRAWERUNIT),
	    		isRebate: data.isRebate
	    	});
    	});
    },
    getData(id, cb){
      var that = this;
      http.get("/api/campaign",{
        params:{campaignId: id}
      })
      .then(function(res){
        if(res.data.code === 200){
        	cb(res.data.data);
        }
      })
      .catch(function(error){
      	console.log(error);
      });
    },
    pageSizeChange(size){
      this.page.pageSize = size;
      this.getList();
    },
    currentPageChange(page){
      this.page.currentPage = page;
      this.getList();
    },
    show(campaignId){
		var list = this.list;
		var tabList = this.$refs.dialog;
		var changeDom = document.getElementById('con-table-change');
		var rage = this.getTop(changeDom) + changeDom.offsetHeight - this.getTop(event.currentTarget);
		var target = this.getMask(event.currentTarget);
		for(var item of list){
			if(item.campaignId == campaignId && item.schedule.length){
				item.timeMore = true;
			}
		}

		if(parseInt(rage) <= 180){
			target.className = 'dialog dialog-white dialog-time arrow-b-r';
			target.style.top = -(150) + 'px';
		} else {
			target.className = 'dialog dialog-white dialog-time arrow';
			target.style.top = 50 + 'px';
		}
    },
    hide(campaignId){
      var list = this.list;
      for(var item of list){
        if(item.campaignId == campaignId){
          item.timeMore = false;
        }
      }
    },
    newPlan() {
    	actions.controlDrawer(this.$store, {
    		show: true,
    		action: 'new',
    		type: 'plan',
    		config: CONST.DRAWERPLAN
    	});
    },
	getTop(ele) {
		var T = ele.offsetTop;
		while(ele = ele.offsetParent)
		{
			T += ele.offsetTop;
		}
		return T;
	},
	getMask(ele) {
		for(var item of ele.parentNode.childNodes) {
			for(var goal of this.$refs.dialog)
			if(item == goal){
				return item;
			}
		}
	}
  }
};
</script>
