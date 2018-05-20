<template>
    <div class="modal_con transition" v-show="modalConfig.show" transition="fade">
        <div class="pop-box {{modalConfig.fixcls || ''}}">
            <div class="ui-dialog-title">{{modalConfig.title}}</div>
            <div class="ui-dialog-body">
                <slot></slot>
            </div>
            <div class="ui-dialog-footer clearfix">
                <div class="ui-dialog-button">
                    <a href="javascript:void(0)" @click="cancel()" class="btn">{{modalConfig.cancel_str}}</a>
                    <a href="javascript:void(0)" @click="apply()" class="btn btn-blue mgl19">{{modalConfig.apply_str}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.modal_con {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}
.pop-box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
<script>
/*
 * modal_con 弹出层容器
 * 接受 props modalConfig
 * modalConfig: {
 *  show: false,
 *  title: 'modal_title',
 *  cancel_str: '放弃',
 *  apply_str: '保存',
 *  cancel_func() {
 *      console.log('cancel');
 *  },
 *  apply_func() {
 *      console.log('apply');
 *  }
 * }
 */

export default {
    name: 'modalCon',
    props: ['modalConfig'],
    methods: {
        cancel() {
            this.modalConfig.cancel_func();
            this.modalConfig.show = false;
        },
        apply() {
            this.modalConfig.apply_func();
        }
    }
}
</script>
