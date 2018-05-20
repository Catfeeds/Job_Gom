<template>
 <div class="special">
 	<div class="totalBox">
 		<h2 class="total">总数：</h2>
 		<router-link :to="{name:'zxlb',params:{id:1},query:{flag:'lists'}}" tag="ul">
 			<li class="totalNum">{{projectTotal}}</li>
 			<li class="totalDate">———&nbsp截止至<span>{{deadline}}</span>&nbsp———</li>
 		</router-link>
 	</div>
 	<div class="lastSix">
 		<h2>近6个月专项数：</h2>
 		<table>
 			<tr v-for="(item,index) in lastHalfYear" :key="index" @click="lastSixClk(item,index)">
 				<td class="leftData">{{item.date}}</td>
 				<td class="rightNum" :class="{canClick:!!item.proNum}">{{item.proNum}}</td>
 			</tr>
 		</table>
 	</div>
 	<router-link to="/wcqk" class="doneBox" tag="div">
 		<h2 class="total">完成情况：</h2>
 		<div class="chartBox"  id="done"></div>
 		<div class="totalDate">———&nbsp截止至<span>{{deadline}}</span>&nbsp———</div>
 	</router-link>
 	<router-link to="/hfzt" class="doneBox" tag="div">
 		<h2 class="total">回复状态：</h2>
 		<div class="chartBox" id="reply"></div>
 		<div class="totalDate">———&nbsp截止至<span>{{deadline}}</span>&nbsp———</div>
 	</router-link>
 	<div class="top10">
    <router-link to="/zxs" tag='h2' class="topAll">TOP{{top10List.length > 5 ? 5 : top10List.length}}</router-link>
 		<ul>
			<router-link tag="li" class="clearfix" v-for="(top,index) in top10List" :key="index"  :to="{name:'zxlb',params:{id:2},query:{name:top.username,nameChn:top.username_chn,flag:'personalLists'}}">
				<div class="top-left">
					<b>{{++index}}.</b>
					<b class="topName">{{top.username_chn}}</b>
					<span>{{top.assignee_position}}</span>
				</div>
			    <div class="top-right">
				 	<span class="topNum">{{top.pronum}}</span>
					<em class="icon iconn-5 zxrw" ></em>
		 		</div>
			</router-link>
			<li class="totalDate topDate">———&nbsp截止至<span>{{deadline}}</span>&nbsp———</li>
			<router-link to="/zxs" tag='li' class="topAll">
				<span>查看全部</span><em class="icon iconn-5 icon-info zxrw"></em>
			</router-link>
 		</ul>
 	</div>
  <div class="clips"></div>
 </div>
</template>
<script>
import {mapState} from 'vuex';
import router from '@/router';
export default {
  name:'app-zx',
  computed:{
  	...mapState({
  		deadline:state=>state.zxModule.deadline,
  		projectTotal:state=>state.zxModule.projectTotal,
  		lastHalfYear:state=>state.zxModule.lastHalfYear,
  		doneChartsOpts:state=>state.zxModule.doneChartsOpts,
  		replyChartsOpts:state=>state.zxModule.replyChartsOpts,
  		top10List:state=>state.zxModule.top10List
  	})
  },
  created:function(){
  	this.$store.dispatch('getInitialData');//获取初始数据
  },
  methods:{
  	lastSixClk:function(item,index){
  		if(item.proNum){
  			router.push({name:'yfzx',query:{date:item.date}})
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.special{
	background: #F3F5F7;
  	margin-top: 1rem;
	.totalDate{
		text-align: center;
		font-size: .24rem;
	    padding-bottom:.4rem;
		color: #999999;
	}
	.total{
			padding: .4rem 0 0 .3rem;
			font-size: .32rem;
			font-weight: bold;
			color: #333;
		}
  	div{
  		background-color: white;
  	}
  	.totalBox{
		ul{
			text-align: center;
			.totalNum{
		    font-family: PingFangSC-Medium;
				font-size: .9rem;
				color: #D63333;
			}
		}
  	}
  	.top10{
  		margin-top: .1rem;
  		padding-left: .3rem;
  		h2{
  			font-size: .32rem;
	    	height: 1.25rem;
   			line-height:1.25rem;
			font-weight: bold;
			color: #333;
			 border-bottom: 1px solid #ddd;
  		}
  		ul{
  			li{
				border-bottom: 1px solid #ddd;
  				div{
  					height: 1.02rem;
  					line-height: 1.02rem;
  					font-family: PingFangSC-Regular;
					font-size: .3rem;
					color: #333333;
  				}
				.top-left{
					float: left;
	  				overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				    width: 5.28rem;
	  				.topName{
	  					margin-right: .24rem;
	  				}
	  				span{
	  					color: #999;
	  				}
				}
				.top-right{
					float: right;
					margin-right: .28rem;
					.topNum{
					    font-family: PingFangSC-Regular;
						margin-right: .30rem;
						color:#333;
						font-weight: bold;
					}
					.icon:before{
						color:#666;
					}
					em{
						font-size: .24rem;
					}
				}
  			}
  			.topDate{
  				border-bottom: none;
  				margin-top: .15rem;
  				padding-bottom: 0;
  			}
  			.topAll{
  				border-bottom: none;
  				text-align: center;
  				font-size: .28rem;
				color: #4A90E2;
				margin-top: .2rem;
				padding-bottom: .28rem;
				span{
					margin-right: .1rem;
				}
				.icon{
					font-size: .24rem;
				}
				.icon:before{
					color: #4A90E2;
				}
  			}
  		}
  	}
  	.doneBox{
  		margin-top: .1rem;
  		padding-left: .3rem;
  		.chartBox{
  			height: 5.08rem;
  		}
  	}
  	.lastSix{
  		height: 8rem;
  		margin-top:.1rem;
  		h2{
		    padding: .4rem 0 .4rem .3rem;
		    font-size: .32rem;
		    font-weight: bold;
		    color: #333;
  		}
  		table{
  			border-top: 1px solid #DDDDDD;
  			margin:0 .2rem;
        padding-bottom: .5rem;
  			tr{
  				font-family: PingFangSC-Regular;
				  font-size: .3rem;
				  color: #333333;
  				height: 1rem;
  				line-height: 1rem;
  				text-align: center;
  				border: 1px solid #DDDDDD;
  				border-top:none; 
  				width: 100%;
  			}
  			.leftData{
  				width: 2.48rem;
  				border-right: 1px solid #DDDDDD;
  			}
  			.rightNum{
  				width: 4.56rem;
  			}
  		}
  	}
  	.zxrw{
  		margin-bottom: .04rem;
  	}
    .clips{
        height: .2rem;
        background-color: #f3f5f7;
    }
}
</style>
