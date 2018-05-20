<template>
  <div class="main">
    <div class="nav-list">
      <commonLists :configs="configs"></commonLists>
    </div>
  </div>
</template>
<script>
import commonLists from '../widget/commonLists';
export default {
  name: 'app-xmlx',
  data () {
    return {
      configs: {
        type: 'listNav',
        list: [
          {
            to: '/xmlx/detail/lxfx',
            text: '项目类型分析'
          },
          {
            to: '/xmlx/detail/xmfxlx',
            text: '项目风险分析'
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

