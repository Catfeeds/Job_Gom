<template>
  <div>
    <div>项目详情</div>
    <router-link to="/xmsx/xmxq/xmcy">项目成员</router-link>
  </div>
</template>
<template>
  <div class="main">
    <div class="nav-list" @click="loadMoreData">
      <commonLists :configs="configs"></commonLists>
      <div class="load-more"><span>上拉加载更多</span><em class="icon iconn-3"></em></div>
    </div>
  </div>
</template>
<script>
import commonLists from '../widget/commonLists';
export default {
  name: 'app-xmcy',
  data () {
    return {
    	configs: {
        type: 'memberList',
        list: [
          {
            text: '海外事业部.海外技术中心经理海外技术中心经理海外技术中心经理',
            name: '1.名字'
          },
          {
            text: '技术中心.测试部总监',
            name: '2.名字'
          },
          {
            text: '产品中心.产品部总监',
            name: '3.名字'
          }
        ]
      }
    }
  },
	 components: {
  	commonLists
	},
	methods: {
		loadMoreData(){
			console.log(1);
		}
	}
}
</script>
