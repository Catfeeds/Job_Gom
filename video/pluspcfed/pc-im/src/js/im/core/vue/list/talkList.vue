 <template> 
    <div class="im-user-list">
      <div class="im-dialog" :class="{hide:!loadListFlag}" ><em class="im-gif"></em>正在加载消息列表</div>
      <dl class="im-userinfo" @click='choose(myXmList.data)' :class="{active:myXmList.groupId ==curTalk.groupId,hide:loadListFlag}">
        <dt class="im-face">
          <img :src="xmAvatar">
        </dt>
        <dd class="num" :class="{hide:!myXmList.unreadNum}">{{myXmList.unreadNum}}</dd>
        <dd class="im-name">
          <h3 class="red">小美<small>官方</small></h3>
          <small class="time">{{myXmList.sendTime}}</small>
        </dd> 
        <dd class="info">{{myXmList.msgBody}}</dd>
      </dl> 

      <dl class="im-userinfo" v-for='(item, index) in myShopLists' :class="{active:item.groupId ==curTalk.groupId}" @click='choose(item.data)' :key="item.groupId" :index="index">
        <dt class="im-face"><img :src="item.icon" onerror="imgError(this)"></dt>
        <dd class="num" :class="{hide:!item.unreadNum}">{{item.unreadNum}}</dd>
        <dd class="im-name">
          <h3>{{item.name}}</h3><small class="time">{{item.time}}</small>
        </dd>
        <dd class="info">{{item.msgBody}}</dd>
      </dl>
   </div>
</template>
<script>
import store from '../../vuex';
import { mapState, mapActions,mapGetters} from 'vuex';
export default {
  computed: {
      ...mapState({
          userInfo: state=>state.initModule.userInfo,
          curTalk:state=>state.listModule.curTalk,
          loadListFlag:state=>state.listModule.loadListFlag,
          imIconUrl:state => state.initModule.imIconUrl,
          myXmList:state =>state.listModule.myXmList,
          myShopLists:state =>state.listModule.myShopLists
      }),
      xmAvatar (){
        return this.imIconUrl+'/src/images/gome-1.png';
      }
  },
  methods: {
      ...mapActions(['changeRemind','sendImMsg']),
      choose (item){
        store.dispatch('selected',{item:item});
      }
  }
}
</script> 
<style>
@import '../../../../../css/core/talkList.css';
</style>