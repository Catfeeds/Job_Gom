<template>
  <div class="main">
    <div class="nav-list">
    </div>
    <no-result :configs="configs"></no-result>
  </div>
</template>
<script>
import noResult from '../common/noResult';
export default {
  name: 'app-ssjg',
  components: {
    noResult
  },
  data(){
    return {
      configs: {
        text: '当前搜索条件无结果'
      }
    }
  }
}
/*
筛选结果 用30个字符卡
筛选条件 中心部门 前面最多5个 后面最多5个
*/
</script>
