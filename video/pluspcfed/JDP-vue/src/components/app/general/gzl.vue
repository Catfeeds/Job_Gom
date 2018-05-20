<template>
  <div class="main">
    <div class="nav-list">
      <commonLists :configs="configs"></commonLists>
    </div>
  </div>
</template>
<script>
import commonLists from '../../widget/commonLists';
export default {
  name: 'app-gzl',
  data () {
    return {
      configs: {
        type: 'gzl',
        list: [
          {
            to: '/gzl/detail/1',
            text: '项目阶段人天分析'
          },
          {
            to: '/gzl/detail/2',
            text: '项目阶段人数分析'
          },
          {
            to: '/gzl/detail/3',
            text: '项目阶段任务数分析'
          }
        ]
      }
    }
  },
  components: {
    commonLists
  }
}
</script>
