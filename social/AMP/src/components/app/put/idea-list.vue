<template>
  <div>
    <div class="amp-path">
      <span class="path-col">单元名称：<b>{{summary.name}}</b></span>
      <span class="path-col">投放平台：<b>{{summary.plat}}</b></span>
      <span class="path-col">已选广告位：<b> <i>{{summary.adNum}}</i>个</b></span>
      <span class="path-col">状态：<b>{{summary.state}}</b></span>
    </div>
    <div class="account-set">
      <div class="set-option">
        <router-link :to="{name: 'unit', params: {id: campaignId}}" class="btn btn-normal btn-back-up"><em class="icon icon-prev"></em>返回</router-link>
        <a href="" class="btn btn-normal" @click.prevent="newIdea">新建创意</a>
        <a href="" class="btn btn-normal" @click.prevent="start">启用</a>
        <a href="" class="btn btn-normal" @click.prevent="stop">暂停</a>
        <a href="" class="btn btn-normal" @click.prevent="del">删除</a>
      </div>
      <div class="set-fn">
        <div class="fn-plan"><span class="plan-title">创意名称：</span>
          <div class="ele-input ele-input-01">
            <input v-model="so.keyword" placeholder="请输入创意名称">
          </div>
        </div>

        <div class="fn-plan"><span class="plan-title">创意状态：</span>
          <el-select v-model="so.state.value" style="width:200px;display:inline-block;" placeholder="全部">
            <el-option v-for="item in so.state.options" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="fn-search" @click.prevent="getList"><a href="" class="btn btn-primary" style="width:76px;padding:0">查询</a></div>
      </div>
    </div>
    <div class="amp-data">
      <div class="data-table">
        <div class="table-list">
          <div class="list-header" :class="{actived: isActived}">
            <span class="span-col-1"><em class="icon icon-select" @click="checkall"></em><i class="data-id">创意ID</i></span>
            <span class="span-col-2">创意名称</span>
            <span class="span-col-3">创意预览</span>
            <span class="span-col-4">创意类型</span>
            <span class="span-col-5">创意尺寸</span>
            <span class="span-col-6">链接类型</span>
            <span class="span-col-7">着陆页地址</span>
            <span class="span-col-8">状态</span>
            <span class="span-col-9">操作</span>
          </div>
          <div v-for="item in list" class="list-body">
            <div class="body-row" :class="{actived: item.isActived}">
              <span class="span-col-1"><em @click="checkbox(item.materialId)" class="icon icon-select"></em><i class="data-id">{{item.materialId}}</i></span>
              <span class="span-col-2" :title="item.name">
                <i class="ellipsis">
                  {{item.name}}
                </i>
              </span>
              <span class="span-col-3">
                <img :src="item.preview" :alt="item.name">
              </span>
              <span class="span-col-4">{{item.type==1?"图片":(item.type==2?"文字":(item.type==3?"图文":"商品"))}}</span>
              <span class="span-col-5">{{item.width}}*{{item.height}}</span>
              <span class="span-col-6">{{item.linkType==1?"商品编号":"URL"}}</span>
              <span class="span-col-7" :title="item.landingPage">
                <i class="ellipsis">
                  {{item.landingPage}}
                </i>
              </span>
              <span class="span-col-8">{{item.state==1?"审核中":(item.state==2?"有效":(item.state==3?"暂停":"审核拒绝"))}}</span>
              <span class="span-col-9">
                <b class="operat-link">
                  <a href="" @click.prevent="modify(item.materialId)">修改</a>
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
      :class="{'el-pagination-reset': true}"
      :total="page.totalCount">
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
import Event from 'event';
import CONST from '../../../help/CONST.js';
import Api from "../../../config/api.config";
import http from "../../../utils/http";
import {formatDate,mixin} from 'utils/common';

export default {
  name: 'app-put-idea-list-overview',
  data() {
    return {
      campaignId: localStorage.getItem("campaignId"),
      flightId: this.$route.params.id,
      summary: {
        name: "",
        plat: "",
        adNum: "",
        state: ""
      },
      so: {
        keyword: "",
        state: {
          options: [{
            label: "全部",
            value: "0"
          },{
            label: "审核中",
            value: "1"
          },{
            label: "有效",
            value: "2"
          },{
            label: "暂停",
            value: "3"
          },{
            label: "审核拒绝",
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
        pageSize: 30
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
    materialIds(){
      var materialIds = [],list = this.list, statusArr = [];
      for(var item of list){
        if(item.isActived){
          materialIds.push(item.materialId);
          statusArr.push(item.status);
        }
      }
      return materialIds;
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
    Event.$off("put-save-success");
    Event.$on("put-save-success", function(){
      that.getList();
    });
    this.getSummary();
    this.getList();
  },
  methods: {
    checkbox(materialId){
      var list = this.list;
      for(var item of list){
        if(item.materialId == materialId){
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
    getSummary(){
      var summary = this.summary;
      http.get("/api/flight/brief", {
        params: {
          flightId: this.flightId
        }
      })
      .then(function(res){
        if(res.data.code == 200){
          var data = res.data.data;
          summary.name = data.name;
          summary.plat = data.platform==1?"APP":(data.platform==2?"WAP":"PC");
          summary.adNum = data.adNumber;
          summary.state = data.state==1?"暂停":"有效";
        }
      })
      .catch(function(error){
        console.log(error);
      });
    },
    getList(){
      var so = this.so, that = this;
      http.get("/api/materials", {
        params:{
          flightId: this.flightId,
          keyword: so.keyword,
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
        if(!this.materialIds.length){
          return;
        }
        http.put("/api/materials/status", {
          materialIds: this.materialIds,
          status: 1
        })
        .then(function(res) {
          if(res.data.code == 200){
            for(var id of that.materialIds){
              for(var item of list){
                if(id == item.materialId){
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
        if(!this.materialIds.length){
          return;
        }
        http.put("/api/materials/status", {
          materialIds: this.materialIds,
          status: 0
        })
        .then(function(res) {
          if(res.data.code == 200){
            for(var id of that.materialIds){
              for(var item of list){
                if(id == item.materialId){
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
        var that = this, list = this.list, canDeleteList = [];
        if(!this.materialIds.length){
          return;
        }
        // let hasNotDelete = false;
        // for(var i=0;i<this.materialIds.length;i++){
        //   console.log(list[i].status);
        //   if(this.statusArr[i].status == 3){
        //     hasNotDelete = true;
        //     this.materialIds.splice(i, 1);
        //     this.statusArr.splice(i, 1);
        //   }
        // }
        // if(hasNotDelete){
        //   this.btn_state = 'cannotDelete';
        // }

        // console.log(canDeleteList);
        http.delete("/api/materials", {
          data:{
            materialIds: this.materialIds
          }
        })
        .then(function(res) {
          if(res.data.code == 200){
            for(var id of that.materialIds){
              for(var i = 0, len = list.length; i < len; i++){
                if(id == list[i].materialId){
                  list.splice(i, 1);
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
      if(!this.materialIds.length){
        return;
      }
      this.dialogVisible = true;
      this.body_html = '<h3>确定启动该创意吗？</h3>';
      this.btn_state = 'start';
    },
    stop(){
      var that = this, list = this.list;
      if(!this.materialIds.length){
        return;
      }
      this.dialogVisible = true;
      this.body_html = '<h3>确定暂停该创意吗？</h3>';
      this.btn_state = 'stop';
    },
    del(){
      var that = this, list = this.list;
      if(!this.materialIds.length){
        return;
      }
      this.dialogVisible = true;
      this.body_html = '<h3>确定删除该创意吗？</h3>';
      this.btn_state = 'delete';
    },
    newIdea() {
      var that = this;
      http.get("/api/campaign", {
        params:{
          campaignId: this.campaignId
        }
      })
      .then(function(res){
        if(res.data.code == 200){
          actions.controlDrawer(that.$store, {
            show: true,
            action: 'new',
            type: 'idea',
            config: mixin({
              flightId: that.flightId
            }, CONST.DRAWERIDEA),
            isRebate: res.data.data.isRebate
          });
        }
      })
      .catch(function(error){
        console.log(error);
      });
    },
    modify(id){
      this.getData(id, "modify");
    },
    /*copy(id){
      this.getData(id, "copy");
    },*/
    getData(id, type){
      var that = this;
      let isRebate;
      http.get("/api/campaign", {params:{campaignId: this.campaignId}})
		  .then(function(res) {
			  if(res.data.code == 200){
			      isRebate = res.data.data.isRebate;
            http.get("/api/material",{
              params:{materialId: id}
            })
            .then(function(res){
              if(res.data.code == 200){
                actions.controlDrawer(that.$store, {
                  show: true,
                  action: type,
                  type: 'idea',
                  config: res.data.data,
                  isRebate: isRebate
                });
              }
            })
            .catch(function(error){
              console.log(error);
            });
        }
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
    show(materialId){
      var list = this.list;
      for(var item of list){
        if(item.materialId == materialId && item.schedule.length){
          item.timeMore = true;
        }
      }
    },
    hide(materialId){
      var list = this.list;
      for(var item of list){
        if(item.materialId == materialId){
          item.timeMore = false;
        }
      }
    }
  }
};
</script>
