<template>
 <div class="special">
 	<div class="totalBox">
 		<h2 class="total">总数：</h2>
 		<router-link :to="{name:'zxlb',params:{id:5},query:{month:date}}" tag="ul">
 			<li class="totalNum">{{total}}</li>
 			<li class="totalDate">————&nbsp专项任务&nbsp————</li>
 		</router-link>
 	</div>
 	
 	<div class="top10">
 		<h2>承担人：</h2>
 		<ul>
			<router-link tag="li" class="clearfix" v-for="(list,index) in lists" :key="index"  :to="{name:'zxlb',params:{id:4},query:{name:list.username,nameChn:list.username_chn,month:date}}">
				<div class="top-left">
					<b>{{++index}}.</b>
					<b class="topName">{{list.username_chn}}</b>
					<span>{{list.assignee_position}}</span>
				</div>
			    <div class="top-right">
				 	<!-- <span class="topNum">{{list.pronum}}</span> -->
					<em class="icon iconn-5 zxrw"></em>
		 		</div>
			</router-link>
 		</ul>
 	</div>
 </div>
</template>
<script>
import echarts from 'echarts';
import {mapState} from 'vuex';
export default {
  name:'app-yfzx',
  computed:{
  	...mapState({
      lists:state=>state.yfzxModule.lists,
      total:state=>state.yfzxModule.total,
      date:state=>state.yfzxModule.date
  	})
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
				font-size: 1rem;
				font-weight: bold;
				color: #D63333;
			    height: 1.26rem;
    			line-height: 1.26rem;
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
}
</style>
