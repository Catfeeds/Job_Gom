<template>
  <ul @touchstart=touchstart($event) @touchmove=touchmove($event) @touchend=touchend($event)>
    <li v-if="configs.type == 'index'" v-for="item in configs.list" class="nav-list-item">
      <router-link :to="item.to">
        <em :class="[item.iconClass]"></em>
        <span>{{item.text}}</span>
        <em class="icon iconn-5 icon-info"></em>
      </router-link>
    </li>
    <li v-if="configs.type == 'main'" v-for="item in configs.list" class="nav-list-item">
      <router-link :to="item.to">
        <!-- <em :class="[item.iconClass]"></em> -->
        <span>{{item.text}}</span>
        <em class="icon iconn-5 icon-info"></em>
      </router-link>
    </li>
    <li v-if="configs.type == 'xmlx'" v-for="item in configs.list" class="nav-list-item">
      <router-link :to="item.to">
        <span>{{item.text}}</span>
        <em class="icon iconn-5 icon-info"></em>
      </router-link>
    </li>
    <li v-if="configs.type == 'sxjg'" @click="goToxmxq(item)" v-for="item in configs.list" :class="setZxlbClassName(item)">
      <em class="line"></em>
      <a><span><u v-if="parseInt(item.isZx)">专项</u><i>{{item.text}}</i></span></a>
      <em v-if="bToDetail" class="icon iconn-5 icon-info"></em>
    </li>
    <li v-if="configs.type == 'gzl'" v-for="item in configs.list" class="nav-list-item">
      <router-link :to="item.to">
        <span>{{item.text}}</span>
        <em class="icon iconn-5 icon-info"></em>
      </router-link>
    </li>
    <li v-if="configs.type == 'xmsx'" v-for="item in configs.list" class="nav-list-item">
      <router-link :to="item.to">
        <span>{{item.text}}</span>
        <em class="icon iconn-5 icon-info"></em>
      </router-link>
    </li>
    <li v-if="configs.type == 'xmsxVisited'" v-for="item in configs.list" class="nav-list-item">
      <router-link :to="item.to">
        <span>{{item.text}}</span>
        <em class="icon iconn-5 icon-info"></em>
        <strong v-if="item.choiceCenter">{{item.choiceCenter}}<span v-if="item.choiceDepart">/</span>{{item.choiceDepart}}</strong>
        <strong v-if="item.choiceText">{{item.choiceText}}</strong>
      </router-link>
    </li>
    <li v-if="configs.type == 'lxxx'" @click="addFilter(item, index)" v-for="(item, index) in configs.list" class="nav-list-item">
      <span>{{item.text}}</span>
      <em class="icon iconn-5 icon-info"></em>
    </li>
    <li v-if="configs.type == 'bmsx'" @click="addFilterDepart(item)" v-for="item in configs.list" class="nav-list-item">
      <span>{{item.text}}</span>
    </li>
    <li v-if="configs.type == 'xmcy'" v-for="(item, index) in configs.list" class="navListItemTitle">
      <strong style="float:none;">{{index+1}}.{{item.name}}</strong>
      <span>{{item.text}}</span>
    </li>
    <li v-if="configs.type == 'search'" class="searchHistory">
      <span>搜索历史</span>
    </li>
    <li v-if="configs.type == 'search'" v-for="(item, index) in configs.list" @click="clickHistory(item)" class="navListItemTitle searchItem">
      <span>{{item.keywords}}</span>
    </li>
    <li v-if="configs.type == 'zxlb'" v-for="(item, index) in configs.list" @click="turnToXq(item)" :class="setZxlbClassName(item)">
      <em class="line"></em>
      <a><span><u>专项</u><i>{{item.text}}</i></span></a>
      <em class="icon iconn-5 icon-info"></em>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';
import store from '../../vuex';
import byteLen from '../../utils/byteLen';
export default {
  name: 'lists',
  props:['configs'],
  computed:{
    ...mapState({
      bToDetail:state=>state.filterByTable.bToDetail
    }),
    classNames(){

    }
  },
  methods: {
    setZxlbClassName(item){
      let n = item.isZx ? 38 : 40;
      if(byteLen(item.text)<n){
        return 'zxlist-li';
      }else{
        return 'zxlist-li2';
      }
    },
    turnToXq(item){
      this.$store.dispatch('setCurProject', {
        curName: '',
        curProjectId: item.projectId
      });
      this.$store.dispatch('initZxState');
      store.dispatch('setZxCurrentId', item.projectId);
      this.$router.push({path:'/zxxq'});
    },
    addFilter(item, index){
      let _this = this;
      let optionsId = parseInt(item.optionsId);
      switch(optionsId){
        case 1:
          if(index == 0){
            this.$router.push({path:'/xmsx'});
            store.commit('filterCenter', {
              centerName: item.text,
              centerId: item.choiceId,
              filterCenter: true
            });
            store.commit('filterDepartment', {
              departId: 0,
              departName: '全部',
              filterDepartment: true
            });
            return;
          }else{
            store.commit('initDepartMents');
          }
          store.commit('filterCenter', {
            centerName: item.text,
            centerId: item.choiceId,
            filterCenter: true
          });
          break;
        case 2:
          store.commit('filterType', {
            typeId: item.choiceId,
            typeName: item.text,
            filterType: true
          });
          break;
        case 3:
          store.commit('filterState', {
            stateId: item.choiceId,
            stateName: item.text,
            filterState: true,
          });
          break;
        case 4:
          store.commit('filterRisk', {
            riskId: item.choiceId,
            riskName: item.text,
            filterRisk: true,
          });
          break;
        case 5:
          store.commit('filterProject', {
            projectId: item.choiceId,
            projectName: item.text,
            filterProject: true
          });
          break;
      }
      if(optionsId == 1){
        this.$router.replace({path:`/xmsx/option/1/${item.choiceId}`});
      }else{
        _this.$router.push({path:'/xmsx'});
      }
    },
    addFilterDepart(item){
      store.commit('filterDepartment', {
        departId: item.departmentId,
        departName: item.text,
        filterDepartment: true
      });
      this.$router.push({path:'/xmsx'});
    },
    goToxmxq(item){
      if(!this.bToDetail)return;
      this.$store.commit('setIsZxReferer', false);
      store.commit('setCurProject', {
        curName: item.text,
        curProjectId: item.projectId
      });
      if(parseInt(item.isZx)){
        this.$router.push({path:'/zxxq'});
      }else{
        this.$router.push({path:'/xmsx/xmxq'});
      }
    },
    touchstart(event){
      this.startY = event.touches[0].clientY;
    },
    touchmove(event){
      this.moveY = event.touches[0].clientY;
    },
    touchend(event){
      let _this = this;
      if(!this.configs.isCanLoad)return;
      if((this.startY - this.moveY) >= 60){
        // store.dispatch('setIsLoad', true);
        // store.dispatch("loading", 1);
        setTimeout(function (){
          switch(_this.$route.name){
            case 'xmcy':
              store.dispatch('filterMembersList', true);
              break;
            case 'bmsx':
              //store.dispatch('filterDepartList', true);
              break;
            case 'sxjg':
              store.dispatch('filterProjectList', true);
              break;
            case 'zxlb':
              switch(_this.$store.state.zxOptions.states){
                case 'all':
                  store.commit('filterZxList1', true);
                  break;
                case 'threeMonths':
                  store.commit('filterZxList2', true);
                  break;
                case 'oneMonth':
                  store.commit('filterZxList3', true);
                  break;
              }
              break;
          }
        }, 100);

      }else{
        store.dispatch('setIsLoad', false);
      }
    },
    clickHistory(item){
      store.commit('setIsShowText', false);
      store.commit('setIsZxReferer', true);
      // store.commit('isSearchShow', 0);
      store.commit('setReffer', 'search');
      store.commit('setSearchText', item.keywords);
      store.commit('initFilterData');
      store.commit('initProjectState');
      store.commit('setTurnToDetail', true);
      this.$router.push({path:'/xmsx/sxjg'});
    }
  }
}
</script>

<style lang='sass'>
@import '../../assets/sass/list.scss';
</style>
