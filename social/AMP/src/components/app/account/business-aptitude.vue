<template>
	<div>
		<m-breadcrumb :config="breadcrumbConfig"></m-breadcrumb>
		<div class="account-set">
			<div class="set-option">
	      <!-- 选择文件-->
	      <div class="uplode-file"><a href="#" class="btn btn-normal">上传商家资质</a>
	        <input type="button" class="file-input" @click="create">
	      </div>
	    </div>
	    <div class="set-fn">
        <div class="fn-plan"><span class="plan-title">资质名称：</span>
          <div class="ele-input">
            <input v-model="so.keyword" placeholder="请输入资质名称">
          </div>
        </div>
        <div class="fn-search"><a href="#" class="btn btn-primary" @click.prevent="getList">查询</a></div>
      </div>
	  </div>
	  <div class="shop-wrap">
      <table class="table table-zebra table-align-left">
        <tbody>
          <tr>
            <th :width="219"><span class="first-child">ID</span></th>
						<th :width="219"><span>资质名称</span></th>
						<th :width="219"><span>图片</span></th>
						<th :width="219"><span>有效期</span></th>
						<th :width="219"><span>操作</span></th>
          </tr>
          <tr v-for="item in list.data">
            <td><span class="first-child">{{item[0]}}</span></td>
            <td><span>{{item[1]}}</span></td>
            <td><span class="table-imgs"><img v-for="image in item[2]" :src="image"></span></td>
            <td><span>{{item[3]}}</span></td>
            <td>
            	<span class="table-links"><a href="#" @click.prevent="modify(item[0])">修改名称</a><a href="#" @click.prevent="del(item[0])">删除</a></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-pagination style="margin-top:20px;" v-show="Math.floor(page.totalCount/page.pageSize)>0"
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      :current-page="page.currentPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next"
      :class="{'el-pagination-reset': true}"
      :total="page.totalCount">
    </el-pagination>
    <m-create-drawer :config="createDrawerConfig"></m-create-drawer>
    <m-modify-drawer :config="modifyDrawerConfig"></m-create-drawer>
	</div>


</template>
<script>
import http from "http";
import store from 'store';
import actions from 'actions';
import Event from 'event';
import {formatDate,mixin} from 'utils/common';
import Breadcrumb from '../../common/breadcrumb.vue';
import createDrawer from "./business-create-drawer";
import modifyDrawer from "./business-modify-drawer";
export default {
	name: 'app-account-account-overview',
	data() {
		return {
			createDrawerConfig: {
				show: false,
				cert: {
					name: "",
					images: [],
					startTime: 0,
        	endTime: "",
        	state: {
	          options: [{
	            label: "商家资质",
	            value: 1
	          },{
	            label: "品牌权限",
	            value: 2
	          }],
            value: 1
	        }
				}
			},
			modifyDrawerConfig: {
				show:false,
				cert:{}
			},
			breadcrumbConfig: {
				data: [{
					msg: '我的账户',
					link: '/#/app/account/'
				}, {
					msg: '商家资质',
					link: '/#' + this.$route.path
				}]
			},
			so: {
        keyword: "",
      },
      list: [],
      page: {
        totalCount: 0,
        currentPage: 1,
        pageSizes: [20, 30, 50],
        pageSize: 30
      }
		};
	},
	components: {
		'm-breadcrumb': Breadcrumb,
		'm-create-drawer': createDrawer,
		'm-modify-drawer': modifyDrawer
	},
	created(){
		var that = this;
		Event.$on("business-save-success", function(){
			that.getList();
		});
		this.getList();
	},
	methods: {
		getList(){
			var so = this.so, that = this;
      http.get("/api/certs", {
        params:{
          keyword: so.keyword,
          page: this.page.currentPage,
          number: this.page.pageSize
        }
      })
      .then(function(res) {
        if(res.data.code == 200){
          that.list = res.data.data.list;
          that.page.totalCount = res.data.data.totalCount;
        }
      })
      .catch(function(error) {
        alert("list fail");
      });
		},
		modify(id){
			var that = this;
			this.modifyDrawerConfig.show = true;
			http.get("/api/cert", {
        params:{
          certificateId: id
        }
      })
      .then(function(res) {
        if(res.data.code == 200){
          that.modifyDrawerConfig.cert = res.data.data;
          that.modifyDrawerConfig.cert.startTime = formatDate(that.modifyDrawerConfig.cert.startTime, "yyyy/MM/dd");
          that.modifyDrawerConfig.cert.endTime = that.modifyDrawerConfig.cert.endTime == 0 ? '长期有效' : formatDate(that.modifyDrawerConfig.cert.endTime, "yyyy/MM/dd");
          that.modifyDrawerConfig.cert.id = id;
        }
      })
      .catch(function(error) {
        console.log("error");
      });
		},
		del(id){
			var that = this;
			http.delete("/api/cert", {
        data:{
          certificateId: id
        }
      })
      .then(function(res) {
        if(res.data.code == 200){
          that.getList();
          /**
          for(var item of that.list.data){
            if(id == item.certificateId){
              // Vue.delete(that.list.data, item);
              that.getList();
              break;
            }
          }
          */
        }
      })
      .catch(function(error) {
        console.log(error);
      });
		},
		create(){
			this.createDrawerConfig.show = true;
		},
    pageSizeChange(size){
      this.page.pageSize = size;
      this.getList();
    },
    currentPageChange(page){
      this.page.currentPage = page;
      this.getList();
    }
	}
};
</script>
