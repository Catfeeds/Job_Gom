<template>
  <div class="account-main">
    <div class="msg-detail">
      <h2 class="detail-header">{{data.title}}</h2>
      <div class="detail-time">{{data.time}}</div>
      <div v-html="data.content" class="detail-infor">
        {{data.content}}
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import http from "http";
import {formatDate} from 'utils/common';
export default {
  name: "app-account-detail-list-overview",
  data(){
    return {
      messageId: this.$route.params.id,
      data: {}
    };
  },
  created(){
    this.getList();
  },
  methods: {
    getList(){
      var that = this;
      http.get("/api/message", {
        params:{
          messageId: this.messageId
        }
      })
      .then(function(res){
        if(res.data.code == 200){
          that.data = res.data.data;
          that.data.time = formatDate(that.data.time, "yyyy/MM/dd hh:mm:ss");
        }
      })
      .catch(function(error){
        console.log(error);
      });
    }
  }
};

</script>