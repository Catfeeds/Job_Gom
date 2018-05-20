<template>
  <div>
    <transition name="fade">
      <div style="z-index:1200;" class="master" v-show="config.show" @click="closeDrawer"></div>
    </transition>
    <transition name="drawer">
      <div class="amp-drawer" v-if="config.show">
        <div class="drawer-part">
          <h2 class="part-header"><span class="header-text">上传资质</span><span class="header-fn"><em class="icon icon-close" @click="closeDrawer"></em></span></h2>
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
                <div class="column-group">
                  <div class="group-aside"><i class="group-tip">*</i>创意图片：</div>
                  <div class="group-detail">
                    <div class="detail-row"> 
                      <div class="uplode-file">
                        <el-upload
                          :action="uploadurl"
                          :accept="filetype"
                          :default-file-list="config.cert.images"
                          :on-success="upSuccess"
                          :on-remove="upRemove">
                          <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        <div v-show="isup&&!images.length" class="el-form-item__error">请输入资质名称</div>
                      </div><span class="form-gray-text">图片大小不超过500k，仅支持jpg、png格式</span>
                    </div>
                  </div>
                </div>
                <div class="column-group">
                  <div class="group-aside">资质类型：</div>
                  <div class="group-detail">
                    <el-select v-model="config.cert.state.value" style="width:150px;display:inline-block;" placeholder="商家资质">
                      <el-option v-for="item in config.cert.state.options" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="column-group">
                  <div class="group-aside"><i class="group-tip">*</i>资质有效期：</div>
                  <div class="group-detail">
                    <el-form-item prop="startTime" style="display:inline-block;">
                      <el-date-picker v-model="config.cert.startTime" type="date"  placeholder="开始日期">
                      </el-date-picker>
                      <span class="plan-title plan-title-gray">-</span>
                      <el-date-picker v-model="config.cert.endTime" type="date" placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
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
import {ERRORMESSAGE} from '../../../help/textMessage';
import Event from 'event';
import apiConfig from '../../../config/api.config.js';
export default{
  name:'account-business-create-drawer',
  props:['config'],
  data(){
    return {
      uploadurl: `${apiConfig[process.env.NODE_ENV]}/api/image/upload`,
      filetype: "image/*",
      images: {
        length: 0,
        list:{}
      },
      isup: 0,
      rules: {
        name: [{
          required: true, message: ERRORMESSAGE.Business.qualificationNameRequired, trigger: 'blur'
        }],
        startTime: [{
          validator: function(rule, value, callback) {
            if(!+value > 0){
              callback(new Error(ERRORMESSAGE.Business.qualificationValidStartTime)); 
            }else{
              callback();
            }
          },
          trigger: "change"
        },{
          validator: (rule, value, callback) => {
            var cert = this.config.cert;
            if(+cert.endTime != 0 && +cert.startTime > +cert.endTime){
              callback(new Error("结束时间不能早于开始时间")); 
            }else{
              callback();
            }
          },
          trigger: "change"
        }]
      }
    };
    
  },
  created(){
  },
  methods: {
    upSuccess(response, file, fileList){
      this.images.list[file.name] = response.data.imageUrl;
      this.images.length++;
    },
    upRemove(file, fileList){
      for(var key in this.images.list){
        if(key == file.name){
          delete this.images.list[key];
          this.images.length--;
        }
      }
    },
    save(){
      var that = this;
      this.isup = 1;
      this.$refs.createForm.validate(function(valid){
        if(!valid || !that.images.length){
          return;
        }
        var cert = that.config.cert;
        var images = [];
        for(var key in that.images.list){
          images.push(that.images.list[key]);
        }
        http.post("/api/cert", {
          certificateId: cert.id,
          name: cert.name,
          images: images,
          startTime: +cert.startTime,
          endTime: +cert.endTime,
          type: cert.state.value
        })
        .then(function(res){
          if(res.data.code == 200){
            that.config.show = false;
            Event.$emit("business-save-success");
            that.isup = 0;
            cert.name = "";
            cert.startTime = "";
            cert.endTime = "";
            cert.state.value = "1";
            that.images = 0;
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
