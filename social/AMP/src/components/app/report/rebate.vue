<template>
  <div>
    <div class="account-set account-set-new">
      <div class="set-tab">

        <router-link v-for="(item, i, j) in reportList" :to="{name:'rebate', params:{tab:i}}" active-class="active" tag="span" :class="{'first': j==0}">{{item.text}}</router-link>
      </div>

      <div class="set-fn">
        <el-form :model="so" :rules="rules" ref="formlist">
          <div class="fn-plan">
            <el-form-item prop="startTime" style="display:inline-block;">
              <span class="plan-title">起止日期：</span>
              <el-date-picker v-model="so.startTime" type="date" style="width:130px;" placeholder="开始日期">
              </el-date-picker>
              <span class="plan-title plan-title-gray">-</span>
              <el-date-picker v-model="so.endTime" type="date" style="width:130px;" placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form>
        <div class="fn-search"><a href="#" class="btn btn-primary" @click.prevent="search">查询</a></div>
        <!-- <div class="fn-export" @click="exportList"><em class="icon icon-report"></em><span>导出</span></div> -->
      </div>
      <div class="table-content">
        <table class="table">
          <tbody>
            <tr>
              <th v-for="item in list.header" :width="120"><span>{{item}}</span></th>
            </tr>
            <tr v-for="items in list.data">
              <td v-for="item in items"><span>{{item}}</span></td>
            </tr>
          </tbody>
        </table>
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
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Api from "../../../config/api.config";
import http from "../../../utils/http";
import {formatDate} from 'utils/common';
export default {
  name: "app-report-ads-overview",
  //props: ["reportList"],
  data(){
    return {
      reportList: {
        "1": {
          text: "投放计划",
          api: "/api/report/rebate/campaign"
        },
        "2": {
          text: "投放单元",
          api: "/api/report/rebate/flight"
        },
        "3": {
          text: "创意",
          api: "/api/report/rebate/material"
        }
      },
      so: {
        startTime: 0,
        endTime: 0,
        /*planState: {
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
        },
        unitState: {
          options: [{
            label: "全部",
            value: "0"
          },{
            label: "暂停",
            value: "1"
          },{
            label: "有效",
            value: "2"
          }],
          value: "0"
        },
        ideaState: {
          options: [{
            label: "全部",
            value: "0"
          },{
            label: "暂停",
            value: "1"
          },{
            label: "有效",
            value: "2"
          }],
          value: "0"
        }*/
      },
      list: {},
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
      }
    };
  },
  created(){
    this.getList();
  },
  computed: {
    tab(){
      return this.$route.params.tab ? this.$route.params.tab : 1;
    }
  },
  methods: {
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
      var that = this, tab = this.tab;
      http.get(this.reportList[tab].api, {
        params:{
          startTime: this.so.startTime?+this.so.startTime:0,
          endTime: this.so.endTime?+this.so.endTime:0,
          page: this.page.currentPage,
          number: this.page.pageSize
        }
      })
      .then(function(res){
        if(res.data.code == 200){
          that.list = res.data.data.list;
          that.page.totalCount = res.data.data.totalCount;
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
    exportList(){

    }
  },
  watch: {
    tab(){
		  this.page.currentPage = 1;
      this.so.startTime = 0;
      this.so.endTime = 0;
      this.getList();
    }
  }
};
</script>
