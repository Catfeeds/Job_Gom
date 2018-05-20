<template>
  <div>
    <!-- <dialog></dialog> -->
    <div class="amp-path">
      <span class="path-col">计划名称：<b>{{summary.name}}</b></span>
      <span class="path-col">有效期：<b>{{summary.startTime}}-{{summary.endTime}}</b></span>
      <span class="path-col">状态：<b>{{summary.state}}</b></span>
    </div>
    <div class="account-set">
      <div class="set-option">
        <router-link to="/app/put/plan" class="btn btn-normal btn-back-up"><em class="icon icon-prev"></em>返回</router-link>
        <a href="" class="btn btn-normal" @click.prevent="newUnit">新建投放单元</a>
        <a href="" class="btn btn-normal" @click.prevent="start">启用</a>
        <a href="" class="btn btn-normal" @click.prevent="stop">暂停</a>
        <a href="" class="btn btn-normal" @click.prevent="del">删除</a>
      </div>
      <div class="set-fn">
        <div class="fn-plan"><span class="plan-title">单元名称：</span>
          <div class="ele-input">
            <input v-model="so.keyword" placeholder="请输入单元名称">
          </div>
        </div>
        <el-form :model="so" :rules="rules" ref="formlist">
          <div class="fn-plan">
            <el-form-item prop="startTime" style="display:inline-block;">
              <span class="plan-title">选择时间：</span>
              <el-date-picker v-model="so.startTime" type="date" style="width:125px;" placeholder="开始日期">
              </el-date-picker>
              <span class="plan-title plan-title-gray">-</span>
              <el-date-picker v-model="so.endTime" type="date" style="width:125px;" placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form>
        <div class="fn-plan"><span class="plan-title">状态：</span>
          <el-select v-model="so.state.value" style="width:100px;display:inline-block;" placeholder="全部">
            <el-option v-for="item in so.state.options" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="fn-plan"><span class="plan-title">设备类型：</span>
          <el-select v-model="so.platform.value" style="width:100px;display:inline-block;" placeholder="全部">
            <el-option v-for="item in so.platform.options" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="fn-search" @click.prevent="search"><a href="" class="btn btn-primary" style="width:76px;padding:0">查询</a></div>
      </div>
    </div>
    <div class="amp-data">
      <div class="data-table">
        <div class="table-list">
          <div class="list-header" :class="{actived: isActived}">
            <span class="span-col-1"><em class="icon icon-select" @click="checkall"></em><i class="data-id">投放单元ID</i></span>
            <span class="span-col-2">投放单元名称</span>
            <span class="span-col-3">定向（地域|时间段）</span>
            <span class="span-col-4">设备类型</span>
            <span class="span-col-5">状态</span>
            <span class="span-col-6">展现数</span>
            <span class="span-col-7">点击数</span>
            <span class="span-col-8">点击率(%)</span>
            <span class="span-col-9">广告总花费</span>
            <span class="span-col-10">返利总花费</span>
            <span class="span-col-11">操作</span>
          </div>
          <div v-for="item in list" class="list-body">
            <div class="body-row" :class="{actived: item.isActived}">
              <span class="span-col-1"><em @click="checkbox(item.flightId)" class="icon icon-select"></em><i class="data-id">{{item.flightId}}</i></span>
              <span class="span-col-2">
                <i class="ellipsis">
                  <router-link :to="{name: 'idea', params: {id: item.flightId}}" :title="item.name">{{item.name}}</router-link>
                </i>
              </span>
              <span class="span-col-3">
                <i class="ellipsis">{{item.timeType==0?"全日程":"自定义"}}|{{item.regionType==0?"全国":"区域"}}</i>
              </span>
              <span class="span-col-4">{{item.platform==1?"APP":(item.platform==2?"WAP":"PC")}}</span>
              <span class="span-col-5">{{item.state==1?"暂停":"启用"}}</span>
              <span class="span-col-6">{{item.impression}}</span>
              <span class="span-col-7">{{item.click}}</span>
              <span class="span-col-8">{{item.ctr}}%</span>
              <span class="span-col-9">{{item.adAmount}}</span>
              <span class="span-col-10">{{item.rebateAmount}}</span>
              <span class="span-col-11">
                <b class="operat-link">
                  <a href="" @click.prevent="modify(item.flightId)">修改</a><a href="" @click.prevent="copy(item.flightId)">复制单元</a><a href="" @click.prevent="newIdea(item.flightId)">新建创意</a>
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
// import Dialog from "../../common/dialog";
import {formatDate,mixin} from 'utils/common';

export default {
  name: 'app-put-unit-list-overview',
  data() {
    return {
      summary: {
        name: "",
        startTime: 0,
        endTime: 0,
        state: "2"
      },
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
            label: "启动",
            value: "2"
          }],
          value: "0"
        },
        platform: {
          options: [{
            label: "全部",
            value: "0"
          },{
            label: "APP",
            value: "1"
          },{
            label: "WAP",
            value: "2"
          },{
            label: "PC",
            value: "3"
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
      rules: {
        startTime: [{
          validator: (rule, value, callback) => {
            if(+this.so.endTime != 0 && +this.so.startTime > +this.so.endTime){
              callback(new Error("结束时间不能早于开始时间"));
            }else{
              callback();
            }
          },
          trigger: "change"
        }]
      },
      dialogVisible: false,
      title : '提示',
      body_html : '',
      btn_state : ''
    };
  },
  components: {
    // 'dialog': Dialog
  },
  computed: {
    flightIds(){
      var flightIds = [],list = this.list;
      for(var item of list){
        if(item.isActived){
          flightIds.push(item.flightId);
        }
      }
      return flightIds;
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
    localStorage.setItem("campaignId", this.$route.params.id);
    this.getSummary();
    this.getList();
  },
  methods: {
    checkbox(flightId){
      var list = this.list;
      for(var item of list){
        if(item.flightId == flightId){
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
      http.get("/api/campaign/brief", {
        params: {
          campaignId: this.$route.params.id
        }
      })
      .then(function(res){
        if(res.data.code == 200){
          var data = res.data.data;
          summary.name = data.name;
          summary.startTime = formatDate(data.startTime, "yyyy/MM/dd");
          summary.endTime = data.isUnlimited?"不限":formatDate(data.endTime, "yyyy/MM/dd");
          summary.state = data.state==0?"全部":(data.state==1?"暂停":(data.state==2?"有效":(data.state==3?"过期":"未开始")));
        }
      })
      .catch(function(error){
        console.log(error);
      });
    },
    search(){
      var that = this;
      this.$refs.formlist.validate(function(valid){
        if(!valid){
          return;
        }
        that.getList();
      });
    },
    getList(){
      var so = this.so, that = this;
      http.get("/api/flights", {
        params:{
          campaignId: this.$route.params.id,
          keyword: so.keyword,
          startTime: so.startTime?+so.startTime:0,
          endTime: so.endTime?+so.endTime:0,
          state: so.state.value,
          platform: so.platform.value,
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
        if(!this.flightIds.length){
          return;
        }
        http.put("/api/flights/status", {
          flightIds: this.flightIds,
          status: 1
        })
        .then(function(res) {
          if(res.data.code == 200){
            that.getList();
            /**
            for(var id of that.flightIds){
              for(var item of list){
                if(id == item.flightId){
                  item.state = 1;
                  break;
                }
              }
            }
            */
          }
        })
        .catch(function(error) {
          alert("fail");
        });
      }else if(this.btn_state == 'stop'){
        var that = this, list = this.list;
        if(!this.flightIds.length){
          return;
        }
        http.put("/api/flights/status", {
          flightIds: this.flightIds,
          status: 0
        })
        .then(function(res) {
          if(res.data.code == 200){
            that.getList();
            /**
            for(var id of that.flightIds){
              for(var item of list){
                if(id == item.flightId){
                  item.state = 0;
                  break;
                }
              }
            }
            */
          }
        })
        .catch(function(error) {
          alert("stop fail");
        });
      }else if(this.btn_state == 'delete'){
        var that = this, list = this.list;
        if(!this.flightIds.length){
          return;
        }
        http.delete("/api/flights", {
          data:{
            flightIds: this.flightIds
          }
        })
        .then(function(res) {
          if(res.data.code == 200){
            for(var id of that.flightIds){
              for(var i = 0, len = list.length; i < len; i++){
                if(id == list[i].flightId){
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
      if(!this.flightIds.length){
        return;
      }
      this.dialogVisible = true;
      this.body_html = '<h3>确定启动该投放单元吗？</h3>';
      this.btn_state = 'start';
    },
    stop(){
      var that = this, list = this.list;
      if(!this.flightIds.length){
        return;
      }
      this.dialogVisible = true;
      this.body_html = '<h3>确定暂停该投放单元吗？</h3>';
      this.btn_state = 'stop';
    },
    del(){
      var that = this, list = this.list;
      if(!this.flightIds.length){
        return;
      }
      this.dialogVisible = true;
      this.body_html = '<h3>确定要删除该投放单元吗？</h3><p>(删除后信息将不在本列表展示，相关数据可在数据报表查看)</p>';
      this.btn_state = 'delete';
    },
    newUnit() {
      var id = this.$route.params.id, that = this;
      http.get("/api/campaign", {
        params:{
          campaignId: id
        }
      })
      .then(function(res){
        if(res.data.code == 200){
          actions.controlDrawer(that.$store, {
            show: true,
            action: 'new',
            type: 'unit',
            config: mixin({
              campaignId: id
            }, CONST.DRAWERUNIT),
            isRebate: res.data.data.isRebate
          });
        }
      })
      .catch(function(error){
        console.log(error);
      });
    },
    newIdea(id) {
      var that = this;
      http.get("/api/campaign", {
        params:{
          campaignId: this.$route.params.id
        }
      })
      .then(function(res){
        if(res.data.code == 200){
          actions.controlDrawer(that.$store, {
            show: true,
            action: 'new',
            type: 'idea',
            config: mixin({
              flightId: id
            }, CONST.DRAWERIDEA),
            isRebate: res.data.data.isRebate
          });
        }
      })
      .catch(function(error){
        console.log(error);
      });
    },
    modify(campaignId){
      this.getData(campaignId, "modify");
    },
    copy(campaignId){
      this.getData(campaignId, "copy");
    },
    getData(id, type){
      var that = this;
      http.get("/api/flight",{
        params:{flightId: id}
      })
      .then(function(res){
        if(res.data.code == 200){
          var dataPackage = {
            show: true,
            action: type,
            type: 'unit',
            config: res.data.data
          };
          if(res.data.data.isRebate){
            dataPackage.isRebate = res.data.data.rebateBid/100;
          }
          actions.controlDrawer(that.$store, dataPackage);
          console.log(res.data.data.rebateBid/100);
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
    show(flightId){
      var list = this.list;
      for(var item of list){
        if(item.flightId == flightId && item.schedule.length){
          item.timeMore = true;
        }
      }
    },
    hide(flightId){
      var list = this.list;
      for(var item of list){
        if(item.flightId == flightId){
          item.timeMore = false;
        }
      }
    }
  }
};
</script>
<style scope>
.el-dialog__body h3 {
  font-weight: normal;
  line-height: 30px;
  font-size: 16px;
  color: #23272c; }
.el-dialog__body p {
  padding-top: 15px;
  font-size: 14px;
  line-height: 24px;
  color: #89919c; }
</style>
