<template>
    <div>
        <el-form :model="formInline"  ref="formInline" :rules="rules" class="query-form" :inline="true" label-width="80px">
            <el-form-item label="项目分组" prop="groupid">
                <el-select v-model="formInline.groupid"  v-on:change="handleGroupChange" placeholder="请选择分组">
                    <el-option
                            v-for="item in formInline.group"
                            :key="item.groupid"
                            :label="item.groupname"
                            :value="item.groupid">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目名称" prop="projectid">
                <el-select v-model="formInline.projectid"  placeholder="请选择项目">
                    <el-option
                            v-for="item in formInline.project"
                            :key="item.projectid"
                            :label="item.projectname"
                            :value="item.projectid">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="handleRelease">发布</el-button>
            </el-form-item>
        </el-form>


    </div>
</template>
<style scoped>
    .query-form {
        padding-left: 25px;
    }
    .form-tag .el-tag{
        margin-right: 10px;
    }
    .search-input .el-input{
        width: 195px;
    }
</style>
<script>
    import store from 'store';

    import {getGroups} from '../../api/group';
    import {getProjects, releaseProject} from '../../api/project';

    export default {
        name: 'releaseproject',
        data() {
            return {
                formInline: {
                    groupid: '',
                    projectid: '',
                    project: [],
                    group: []
                },
                rules: {
                    groupid: [
                        { type: "number", required: true, message: '请选择分组',  trigger: 'change'}
                    ],
                    projectid: [
                        { type: "number", required: true, message: '请选择项目', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            handleGroupChange(val) {
                this.formInline.project = [];
                if (this.formInline.groupid !== '') {
                    getProjects({
                        id: this.formInline.groupid,
                    }).then(data => {
                        this.formInline.project = data.data;
                        this.formInline.projectid = '';
                    });
                }
            },
            handleRelease() {
                this.$refs['formInline'].validate((valid) => {
                    if (valid) {
                        releaseProject({
                            id: this.formInline.projectid
                        }).then(data=>{
                            console.log(data);
                            if (data.code === 200) {
                                this.$message.success({
                                    showClose: true,
                                    message: '发布成功'
                                });
                            } else{
                                this.$message.error({
                                    showClose: true,
                                    message: '发布失败'
                                });
                            }
                        });
                    }
                });
            }
        },
        created() {
            getGroups().then(data=>{
                this.formInline.group = data.data;
            }).then(()=>{

            });
        }
    };
</script>
