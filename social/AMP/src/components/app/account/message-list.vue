<template>
  <div class="account-main">
    <div class="tabs">
      <ul>
        <router-link v-for="(item, key) in reportList" tag="li" :to="{name:'message-list', params:{type: key}}" active-class="actived">
          <a href="#">{{item}}</a>
        </router-link>
      </ul>
    </div>
    <div class="main-record">
      <!-- 消费记录-->
      <div class="record-consume">
        <!-- 查询-->
        <div class="set-fn">
          <div class="fn-plan"><span class="plan-title">关键词：</span>
            <div class="ele-input">
              <input v-model="so.keyword" placeholder="请输入关键词">
            </div>
          </div>
          <el-form :model="so" :rules="rules" ref="formlist">
            <div class="fn-plan">
              <el-form-item prop="startTime" style="display:inline-block;">
                <span class="plan-title">起止时间：</span>
                <el-date-picker v-model="so.startTime" type="date" style="width:190px;" placeholder="开始日期">
                </el-date-picker>
                <el-date-picker v-model="so.endTime" type="date" style="width:190px;" placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-form>
          <div class="fn-search"><a href="#" class="btn btn-primary" @click.prevent="search">查询</a></div>
        </div>
        <!-- 列表-->
        <div class="message-list">
          <ol>
            <li v-for="item in list" :class="{actived:item.isRead==0}">
              <em v-show="type==2||type==3" class="icon icon-letter"></em>
              <span class="list-infor"><router-link :to="{name: 'message-detail', params:{id: item.messageId}}">{{item.title}}</a></span>
              <span class="list-time">{{item.time}}</span>
            </li>
          </ol>
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
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import http from "http";
import {formatDate} from 'utils/common';
export default {
  name: "app-account-detail-list-overview",
  data(){
    return {
      reportList: {
        "1": "系统公告",
        "2": "资金变动",
        "3": "账单"
      },
      so: {
        keyword: "",
        startTime: 0,
        endTime: 0
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
    type(){
      return this.$route.params.type ? this.$route.params.type : 1;
    }
  },
  methods: {
    getList(){
      var that = this;
      http.get("/api/messages", {
        params:{
          type: this.type,
          keyword: this.so.keyword,
          startTime: new Date(this.so.startTime).valueOf(),
          endTime: new Date(this.so.endTime).valueOf(),
          page: this.page.currentPage,
          number: this.page.pageSize
        }
      })
      .then(function(res){
        if(res.data.code == 200){
          that.list = res.data.data.list;
          for(var item of that.list){
            item.time = formatDate(item.time, "yyyy/MM/dd");
          }
          that.page.totalCount = res.data.data.totalCount;
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
    type(){
		this.page.currentPage = 1;
      this.getList();
    }
  }
};

</script>
