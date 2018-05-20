<template>
  <div>
    <transition name="fade">
      <div style="z-index:1200;" class="master" v-show="config.show" @click="closeDrawer"></div>
    </transition>
    <transition name="drawer">
      <div class="amp-drawer" v-if="config.show">
        <div class="drawer-part">
          <h2 class="part-header"><span class="header-text">修改资质名称</span><span class="header-fn"><em class="icon icon-close" @click="closeDrawer"></em></span></h2>
          <div class="shop-cont">
            <div class="form-column">
              <el-form :model="config.cert" :rules="rules" ref="createForm" label-width="0">
                <div class="column-group">
                  <div class="group-aside"><i class="group-tip">*</i>资质名称：</div>
                  <div class="group-detail">
                    <div class="detail-row"> 
                      <el-form-item prop="name" style="display:inline-block;width:420px;">
                        <el-input v-model="config.cert.name"></el-input>
                      </el-form-item>
                      <span class="form-gray-text form-gray-width">请注意根据资质内容修改资质名称<br>若资质名称不明确，将延长审核时间</span>
                    </div>
                  </div>
                </div>
                <div class="column-group column-group01">
                  <div class="group-aside">创意图片：</div>
                  <div class="group-detail">
                    <div class="detail-row shop-picture">
                      <img v-for="image in config.cert.images" :src="image"></div>
                  </div>
                </div>
                <div class="column-group column-group02">
                  <div class="group-aside">资质类型：</div>
                  <div class="group-detail">
                    <div class="detail-row"> <span class="form-infor">{{config.cert.type==1?"商家资质":"品牌授权"}}</span></div>
                  </div>
                </div>
                <div class="column-group">
                  <div class="group-aside">资质有效期：</div>
                  <div class="group-detail">
                    <div class="detail-row"> <span class="form-infor">{{config.cert.startTime}}</span><span class="form-infor">-</span><span class="form-infor">{{config.cert.endTime}}</span></div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
        <div class="drawer-btn"><a href="#" class="btn btn-primary" @click.prevent="save">提交</a><a href="#" class="btn btn-gray" @click.prevent="closeDrawer">取消</a></div>
      </div>
    </transition>
  </div>
</template>
<script>

import http from 'http';
import Event from 'event';
import {ERRORMESSAGE} from '../../../help/textMessage';
export default{
  name:'account-business-modify-drawer',
  props:['config'],
  data(){
    return {
      rules: {
        name: [{
          required: true, message: ERRORMESSAGE.Business.qualificationNameRequired, trigger: 'blur'
        },{
          validator: function(rule, value, callback) {
            if(value.length > 30){
              callback(new Error(ERRORMESSAGE.Business.qualificationMaxLength)); 
            }else{
              callback();
            }
          },
          trigger: "blur"
        }]
      }
    };
    
  },
  methods: {
    save(){
      var that = this;
      this.$refs.createForm.validate(function(valid){
        if(!valid){
          return;
        }
        http.put("/api/cert", {
          certificateId: that.config.cert.id,
          name: that.config.cert.name
        })
        .then(function(res){
          if(res.data.code == 200){
            Event.$emit("business-save-success");
            that.config.show = false;
          }
        })
        .catch(function(error){
          console.log(error);
        });
      });
    },
    closeDrawer(){
      this.config.show = false;
    }  
  }
  
};
</script>
