<template>
  <div class="main">
    <div class="pageIndex">
      <ul>
          <router-link to="/zx" tag='li' class="specialTask">
            <div class="pic picSpecial"></div>
            <div class="text">专项任务</div>
          </router-link>
          <router-link to="/main" tag='li' class="general">
            <div class="pic picGeneral"></div>
            <div class="text">项目</div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="tips">
      <ul>
        <li class="title">注：</li>
        <li>专项任务: 公司领导下发的任务，以专项形式完成。</li>
        <li>项目: 各中心/部门规划的项目，以满足需求和按时上线为目标。</li>
      </ul>
    </div>
  </div>
</template>
<script>
import url from '@/assets/images/special.png';
export default {
  name: 'app-index',
  data () {
    return {
      configs: {
        type: 'index',
        list: [
          {
            to: '/zx',
            iconClass: 'icon iconn-10',
            text: '专项任务'
          },
          {
            to: '/main',
            iconClass: 'icon iconn-6',
            text: '项目'
          }
        ]
      }
    }
  },
  created(){
    let _this = this;
    if(window.localStorage){
      localStorage.removeItem('scrolltop');
      localStorage.removeItem('scrolltop1');
      localStorage.removeItem('scrolltop2');
      localStorage.removeItem('scrolltop3');
      localStorage.removeItem('scrolltop4');
    }
  }
}
</script>
<style lang='scss'>
.pageIndex{
  ul{
    margin-top:1.6rem;
    li{
      text-align: center;
      
      div{
        font-family: PingFangSC-Medium;
        font-size: .32rem;
        margin-top: .26rem;
        font-weight: bold;
      }
      .pic{    
        margin: 0 auto;
        width: 2rem;
        height: 2rem;
        
      }
      .picSpecial{
        background: url(../../assets/images/special.png) 50% 100% no-repeat;
        background-size: 1.6rem;
      }
      .picGeneral{
        background: url(../../assets/images/general.png) 50% 100% no-repeat;
        background-size: 1.6rem;
      }
    }
    .general{
      margin-top: 1.2rem;
    }
  }
}
.tips{
  margin-top: 1.84rem;
  padding: 0 .34rem 0 .43rem;
  font-family: PingFangSC-Regular;
  font-size: .26rem;
  ul{
    li{
      padding-left: .26rem;
      color:#666;
    }
    .title{
      padding-left: 0
    }
  }
}
/*@import '../../assets/sass/xmjd.scss';*/
</style>

