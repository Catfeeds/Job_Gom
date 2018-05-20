<template>
  <ul @touchstart=touchstart($event) @touchmove=touchmove($event) @touchend=touchend($event)>
    <li v-if="configs.type == 'main'" v-for="item in configs.list" class="nav-list-item">
      <router-link :to="item.to">
        <em :class="[item.iconClass]"></em>
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
    <li v-if="configs.type == 'sxjg'" @click="goToxmxq(item)" v-for="item in configs.list" class="nav-list-item mr80">
      <span>{{item.text}}</span>
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
      <strong>{{index+1}}.{{item.name}}</strong>
      <span>{{item.text}}</span>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';
import store from '../../vuex';
export default {
  name: 'lists',
  props:['configs'],
  computed:{
    ...mapState({
      bToDetail:state=>state.filterByTable.bToDetail

    })
  },
  methods: {
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
      store.commit('setCurProject', {
        curName: item.text,
        curProjectId: item.projectId
      });
      this.$router.push({path:'/xmsx/xmxq'});
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
          }
        }, 100);

      }else{
        store.dispatch('setIsLoad', false);
      }
    }
  }
}
</script>

<style lang='sass'>
@import '../../assets/sass/list.scss';
</style>
