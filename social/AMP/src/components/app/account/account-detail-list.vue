<template>
  <div class="account-main">
    <div class="tabs">
      <ul>
        <router-link v-for="(item, key) in reportList" tag="li" :to="{name:'account-detail-list', params:{type: key}}" active-class="actived">
          <a href="#">{{item.text}}</a>
        </router-link>
      </ul>
    </div>
    <div class="main-record">
      <!-- 消费记录-->
      <div class="record-consume">
        <!-- 查询-->
        <div class="set-fn">
          <div class="fn-plan">
            <span class="plan-title">日期：</span>
            <el-date-picker v-model="so.startTime" type="date" style="width:190px;" placeholder="查询日期">
            </el-date-picker>
          </div>
          <div v-show="type==2" class="fn-plan"><span class="plan-title">状态：</span>
            <el-select v-model="so.state.value" style="width:190px;display:inline-block;" placeholder="全部">
            <el-option v-for="item in so.state.options" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          </div>
          <div class="fn-search"><a href="#" class="btn btn-primary" @click.prevent="getList">查询</a></div>
        </div>
        <!-- 列表-->
        <div class="cont-list scroll-x">
          <table class="table">
            <tbody>
              <tr>
                <th v-for="(item, i) in list.header" :width="i==3?230:120">
                  <span>{{item}}</span>
                </th>
              </tr>
              <tr v-for="items in list.data">
                <td v-for="(item, i) in items">
                  <span v-if="i==0 && type==1">
                    <router-link :to="{name: 'account-day-detail', params:{type: type, date:item}}">{{item}}</router-link>
                  </span>
                  <span v-else>{{item}}</span>
                </td>
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
          :class="{'el-pagination-reset': true}"
          :total="page.totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import http from "http";
export default {
  name: "app-account-detail-list-overview",
  data(){
    return {
      reportList: {
        "1": {
          text: "消费记录",
          api: "/api/account/expense"
        },
        "2": {
          text: "充值记录",
          api: "/api/account/income"
        }
      },
      so: {
        startTime: 0,
        state: {
          options: [{
            label: "全部",
            value: "0"
          },{
            label: "处理中",
            value: "1"
          },{
            label: "成功",
            value: "2"
          }],
          value: "0"
        }
      },
      list: {},
      page: {
        totalCount: 0,
        currentPage: 1,
        pageSizes: [20, 30, 50],
        pageSize: 30
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
      var that = this, url, id, type = this.type;
      var params = {
        time: new Date(this.so.startTime).valueOf(),
        page: this.page.currentPage,
        number: this.page.pageSize
      };
      type == 2 && (params.state = this.so.state.value);
      http.get(this.reportList[type].api, {
        params
      })
      .then(function(res){
        if(res.data.code == 200){
          that.list = res.data.data.list;
          that.page.totalCount = res.data.data.list.data.length;
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
    type(){
		this.page.currentPage = 1;
      this.getList();
    }
  }
};

</script>
