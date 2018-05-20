<template>
  <div class="account-main account-main01">
    <div class="amp-path"><span class="path-col">2016年12月11日费用支出明细</span></div>
        <!-- 列表-->
    <div class="main-wrap">
      <div class="record-consume">
        <div class="cont-list">
          <table class="table">
            <tbody>
              <tr>
                <th v-for="item in list.header" :width="120">
                  <span>{{item}}</span>
                </th>
              </tr>
              <tr v-for="items in list.data">
                <td v-for="(item, i) in items">
                  <span>{{item}}</span>
                </td>
              </tr>
            </tbody>
          </table>
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
  </div>
</template>
<script type="text/javascript">
import http from "http";
export default {
  name: "app-account-day-detail-overview",
  data(){
    return {
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
    },
    date(){
      return this.$route.params.date;
    }
  },
  methods: {
    getList(){
      var that = this;
      http.get("/api/account/expense/daily", {
        params: {
          time: +new Date(this.date),
          page: this.page.currentPage,
          number: this.page.pageSize
        }
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
      this.getList();
    },
    date(){
      this.getList();
    }
  }
};

</script>