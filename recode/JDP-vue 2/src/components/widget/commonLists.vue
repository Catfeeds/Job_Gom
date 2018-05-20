<template>
  <ul>
    <li v-for="item in configs.list" class="nav-list-item">
      <router-link :to="item.to" v-if="item.to">
        <em v-if="configs.type == 'main'" :class="[item.iconClass]"></em>
        <span>{{item.text}}</span>
        <strong v-if="item.choiceText">{{item.choiceText}}</strong>
        <em v-if="configs.type == 'listNav'" class="icon iconn-5 icon-info"></em>
      </router-link>
      <span v-if="!item.to" :class="{navListItemTitle:configs.type == 'memberList'}">
        <strong v-if="configs.type == 'memberList'">{{item.name}}</strong>
        {{item.text}}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'lists',
  data(){
    return{
      
    }
  },
  props:['configs'],
  methods:{
    
  },
  created(){
  }
}
</script>

<style lang='sass'>
@import '../../assets/sass/list.scss';
</style>
