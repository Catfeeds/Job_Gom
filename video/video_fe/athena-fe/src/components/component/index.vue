<template>
	<div>
		<el-form :model="formInline"   class="query-form" :inline="true" label-width="80px">
			<el-form-item label="项目分组">
                <el-select v-model="groupValue" ref="groupValue" v-on:change="handleGroupChange" placeholder="请选择分组">
                    <el-option
                            v-for="item in formInline.group"
                            :key="item.groupid"
                            :label="item.groupname"
                            :value="item.groupid">
                    </el-option>
                </el-select>
			</el-form-item>
			<el-form-item label="项目名称">
				<el-select v-model="projectValue" ref="projectValue" v-on:change="handleProjectChange" placeholder="请选择项目">
                    <el-option
                            v-for="item in formInline.project"
                            :key="item.projectid"
                            :label="item.projectname"
                            :value="item.projectid">
                    </el-option>
				</el-select>
			</el-form-item>
            <el-form-item label="分支类型">
                <el-select v-model="branchType" ref="branchType" @change="handleBranchChange" placeholder="请选择类型">
                    <el-option label="集成开发" value="cdn"></el-option>
                    <el-option label="分支开发" value="feature"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="执行环境">
                <el-select v-model="envtype" ref="envType" @change="handleEnvChange"  placeholder="请选择环境">
                    <el-option label="开发环境" value="dev"></el-option>
                    <el-option label="测试环境" value="test"></el-option>
                    <el-option label="预生产环境" value="pre"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="服务名称" label-width="80px" class="search-input">
                <el-input v-model="serverName"></el-input>
            </el-form-item>
            <el-form-item label="分支名称" label-width="80px" class="search-input">
                <el-input v-model="branchName"></el-input>
            </el-form-item>
			<el-form-item>
				<el-button type="primary" v-on:click="handleSearch">查询</el-button>
			</el-form-item>
		</el-form>

        <el-col :span="12" class="form-tag">
            <el-tag v-for="tag in filterLabel" :key="tag.name" :closable="true" :type="tag.type" :close-transition="false" @close="handleClose(tag)">
                {{tag.name}}
            </el-tag>
        </el-col>


		<el-table class="table"
				  :data="tableData"
				  border
				  style="width: 100%">
			<el-table-column
					label="服务名称"
					width="140">
				<template scope="scope">
					<span style="margin-left: 10px">{{ scope.row.servername }}</span>
				</template>
			</el-table-column>
            <el-table-column
                    label="执行环境"
                    width="100">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.envtype === 'dev' ? '开发': (scope.row.envtype === 'test' ? '测试' : (scope.row.envtype === 'pre' ? '预生产' : '分支'))}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="资源类型"
                    width="110">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.branchtype === 'cdn' ? '集成开发' : '分支开发' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="分支名称"
                    width="120">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.branchname }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="资源地址"
                    width="220">
                <template scope="scope">
                    <!--<span style="margin-left: 10px">{{ host + scope.row.diskpath }}</span>-->
                    <el-popover trigger="hover" placement="top">
                        <p>{{ host + scope.row.diskpath }}</p>
                        <div slot="reference" class="name-wrapper">
                            {{ host + scope.row.diskpath }}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
			<el-table-column
					label="创建人"
					width="80">
				<template scope="scope">
                    <div slot="reference">
                        <span>{{ scope.userid ? scope.userid.username : '管理员'}}</span>
                    </div>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
                    <!--<el-button size="mini" @click="handleBuild(scope.$index, scope.row)">云编译</el-button>-->
                    <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">更新</el-button>
					<el-button
							size="mini"
							@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button
							size="mini"
							type="danger"
							@click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleView(scope.$index, scope.row)">查看文件</el-button>
				</template>
			</el-table-column>
		</el-table>

        <div class="btn-add">
            <el-button
                    size="small" type="primary" @click="handleOpenAdd"
            >新增静态资源服务</el-button>
        </div>

		<el-pagination class="pagination"
					   @size-change="handleSizeChange"
					   @current-change="handleCurrentChange"
					   :current-page.sync="currentPage"
					   :page-size="pageSize"
					   layout="total, prev, pager, next"
					   :total="total">
		</el-pagination>

        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
            <el-form :model="serverForm" :rules="rules" ref="serverForm">

                <el-form-item label="项目分组" prop="groupid">
                    <el-select v-model="serverForm.groupid" :disabled="disabled" v-on:change="handleHandleChange" placeholder="项目分组">
                        <el-option
                                v-for="item in serverForm.group"
                                :key="item.groupid"
                                :label="item.groupname"
                                :value="item.groupid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目名称" prop="projectid">
                    <el-select v-model="serverForm.projectid" ref="projectid" :disabled="disabled" placeholder="项目名称">
                        <el-option
                                v-for="item in serverForm.project"
                                :key="item.projectid"
                                :label="item.projectname"
                                :value="item.projectid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分支类型" prop="branchtype">
                    <el-select v-model="serverForm.branchtype" :disabled="disabled" @change="handleFormBranchChange" placeholder="请选择类型">
                        <el-option label="集成开发" value="cdn"></el-option>
                        <el-option label="分支开发" value="feature"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="执行环境" v-show="serverForm.branchtype==='cdn'" prop="envtype">
                    <el-select v-model="serverForm.envtype" :disabled="disabled" placeholder="请选择类型">
                        <el-option label="开发环境" value="dev"></el-option>
                        <el-option label="测试环境" value="test"></el-option>
                        <el-option label="预生产环境" value="pre"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="静态资源服务名称" prop="servername">
                    <el-input v-model="serverForm.servername" :disabled="serverForm.branchtype==='cdn'" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分支名称" v-show="serverForm.branchtype === 'feature'" prop="branchname">
                    <el-input v-model="serverForm.branchname" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddorUpdate('serverForm')">确 定</el-button>
            </div>
        </el-dialog>
	</div>
</template>
<style scoped>
    .btn-add {
        float:left;
        margin-top: 15px;
    }
    .form-tag{
        margin: 20px;
    }
    .form-tag .el-tag{
        margin-right: 10px;
    }
    .search-input .el-input{
        width: 195px;
    }
    .el-button {
        margin-left: 0;
    }
</style>
<script>
    import store from 'store';

    import config from '../../config/http.config';
    import {getGroups} from '../../api/group';
    import {getProjects} from '../../api/project';
    import {pagenation, createBranch, deleteBranch,
        updateBranch, getBranch, editBranch, buildBranch} from '../../api/branch';

    export default {
        name: 'index',
        data() {
            var validatePass = (rule, value, callback) => {
                if (this.serverForm.branchtype === 'cdn') {
                    callback();
                    return;
                }
                if (value === '') {
                    callback(new Error('请输入分支名称'));
                } else {
                    callback();
                }
            };
            var validateEnv = (rule, value, callback) => {
                if (this.serverForm.branchtype === 'feature') {
                    callback();
                    return;
                }
                if (value === '') {
                    callback(new Error('请选择执行环境'));
                } else {
                    callback();
                }
            };
            return {
                host: "",
                edit: false,
                total: 0,
                disabled: false,
                dialogTitle:'新建静态资源服务',
                dialogFormVisible: false,
                filterLabel: [],
                serverForm: {
                    servername: '',
                    groupid: 0,
                    branchname: '',
                    branchtype: '',
                    projectid: 0,
                    envtype: '',
                    group: [],
                    project: []
                },
                currentPage: 1,
                pageSize: 10,
                envtype: '',
                groupValue: '',
                projectValue: '',
                branchType: '',
                serverName: '',
                branchName: '',
                groupHandleValue: '',
                projectHandleValue: '',
                formInline: {
                    group: [],
                    project: []
                },
                tableData: [],
                rules: {
                    groupid: [
                        { type: "number", required: true, message: '请选择分组',  trigger: 'change'}
                    ],
                    projectid: [
                        { type: "number", required: true, message: '请选择项目', trigger: 'change' }
                    ],
                    branchtype: [
                        { required: true, message: '请选择分支类型', trigger: 'change' }
                    ],
                    servername: [
                        { required: true, message: '请输入服务名称', trigger: 'blur' }
                    ],
                    branchname: [
                        { message: '请输入分支名称', trigger: 'blur', validator: validatePass }
                    ],
                    envtype: [
                        { message: '请选择执行环境', trigger: 'change', validator: validateEnv }
                    ]
                }
            }
        },
        methods: {
            refresh(params = {}) {
                pagenation({
                    limit: this.pageSize,
                    page: this.currentPage,
                    groupid: params.groupid || this.groupValue,
                    projectid: params.projectid || this.projectValue,
                    branchtype: params.branchtype || this.branchType,
                    envtype: params.envtype ||this.envtype,
                    servername: params.servername || this.serverName,
                    branchname: params.branchname || this.branchName
                }).then(data=>{
                    this.tableData = data.data.result.result;
                    this.total = data.data.totalCount;
                    this.host = data.data.host;
                });
            },
            handleClose(tag) {
                this.filterLabel.splice(this.filterLabel.indexOf(tag), 1);
                switch (tag.searchType) {
                    case 'group':
                        this.groupValue = "";
                        this.projectValue = "";
                        break;
                    case 'project':
                        this.projectValue = "";
                        break;
                    case 'branch':
                        this.branchType = "";
                        break;
                    case 'env':
                        this.envtype = "";
                        break;
                }
                this.refresh();
            },
            handleOpenAdd() {

                this.dialogTitle = "新增静态资源服务";
                this.disabled = false;
                this.edit = false;
                Object.assign(this.serverForm, {
                        servername: '',
                        branchname: '',
                        branchtype: '',
                        projectid: '',
                        groupid: ''
                });
                this.dialogFormVisible = true;
                setTimeout(()=>{
                    this.$refs['serverForm'].resetFields();
                }, 100);
            },
            handleBuild(index, row) {
                buildBranch(row).then(data=>{
                    if (data.code != 200) {
                        this.$message.success({
                            showClose: true,
                            message: data.msg
                        });
                    } else {
                        this.$message.success({
                            showClose: true,
                            message: "云编译成功"
                        });
                    }
                });
            },
            handleView(index, row) {
                window.open(config['production'] + '/static/template.html?id='+row._id,'文件浏览器');
            },
            handleEdit(index, row) {
                this.dialogTitle = "编辑静态资源服务";
                this.dialogFormVisible = true;
                this.edit = true;
                getBranch(row._id).then(data=>{
                    Object.assign(this.serverForm, data);
                    setTimeout(()=>{
                        this.serverForm.projectid = data.projectid;
                    }, 100);
                    this.disabled = true;
                });
            },
            handleUpdate(index, row) {
                updateBranch(row._id).then(data=>{
                    if (data.code === 200){
                        this.$message.success({
                            showClose: true,
                            message: '更新成功'
                        });
                        this.refresh();
                    } else {
                        this.$message.error({
                            showClose: true,
                            message: '更新失败'
                        });
                    }
                });
            },
            handleDelete(index, row) {
                this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteBranch(row._id).then(data=>{
                        if (data.code === 200){
                            this.$message.success({
                                showClose: true,
                                message: '删除成功'
                            });
                            this.refresh();
                        } else {
                            this.$message.error({
                                showClose: true,
                                message: '删除失败'
                            });
                        }
                    });
                }).catch(() => {

                });
            },
            handleSizeChange(val) {

                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.refresh();
            },
            removeFilter(attrName) {
                this.filterLabel = this.filterLabel.filter(current=>{
                    return current.searchType !== attrName;
                });
            },
            setFilter(attrName, refName, val, cb) {
                if (val === "") {
                    return;
                }
                let attrFilter = this.filterLabel.filter(current=>{
                    return current.searchType === attrName;
                });
                if (attrFilter.length <= 0) {
                    this.filterLabel.push({
                        searchType: attrName,
                        id: val,
                        name: this.$refs[refName].selectedLabel
                    });
                } else {
                    this.filterLabel = this.filterLabel.map(current=>{
                        if (current.searchType === attrName) {
                            current.id = val;
                            current.name = this.$refs[refName].selectedLabel
                        }
                        return current;
                    });
                }

                if (cb) {
                    cb();
                }
            },
            handleGroupChange(val) {
                this.removeFilter('project');
                this.setFilter('group', 'groupValue', val);

                this.formInline.project = [];
                this.projectValue = '';
                if (this.groupValue !== '') {
                    getProjects({
                        id: this.groupValue,
                    }).then(data=>{
                        this.formInline.project = data.data;
                        this.refresh();
                    });
                }
            },
            handleProjectChange(val) {
                this.setFilter('project', 'projectValue', val, ()=>{
                    this.refresh();
                });

            },
            handleBranchChange(val) {
                this.setFilter('branch', 'branchType', val, ()=>{
                    this.refresh();
                });
            },
            handleFormBranchChange(val) {
                if (val === 'cdn') {
                    this.serverForm.branchname = 'develop';
                    this.serverForm.servername = this.$refs['projectid'].selectedLabel;
                }
            },
            handleEnvChange(val) {
                this.setFilter('env', 'envType', val, ()=>{
                    this.refresh();
                });
            },
            handleHandleChange(val) {
                this.serverForm.project = [];
                this.serverForm.projectid = '';
                if (this.serverForm.groupid === "") {
                    return;
                }
                getProjects({
                    id: this.serverForm.groupid,
                }).then(data=>{
                    this.serverForm.project = data.data;
                })
            },
            handleSearch() {
                if (this.groupValue == "" ) {
                    this.$message.error({
                        showClose: true,
                        message: '请选择分组'
                    });
                    return;
                }
                this.refresh();
            },
            handleAddorUpdate(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = false;
                        if (this.edit) {
                            editBranch(this.serverForm).then(data=>{
                                if (data.code == 200) {
                                    this.$message.success({
                                        showClose: true,
                                        message: '编辑成功'
                                    });
                                } else {
                                    this.$message.success({
                                        showClose: true,
                                        message: '编辑失败'
                                    });
                                }
                                this.refresh({
                                    groupid: this.serverForm.groupid,
                                    projectid: this.serverForm.projectid,
                                    branchtype: this.serverForm.branchtype,
                                    envtype: this.serverForm.envtype
                                });
                            });
                        } else {
                            if (this.branchtype === 'cdn') {
                                this.serverForm.branchname = 'develop';
                            }
                            createBranch(this.serverForm).then(data=>{
                                if (data.code === 200) {
                                    this.$message.success({
                                        showClose: true,
                                        message: '新增成功'
                                    });
                                } else{
                                    this.$message.error({
                                        showClose: true,
                                        message: data.msg
                                    });
                                }
                                this.refresh({
                                    groupid: this.serverForm.groupid,
                                    projectid: this.serverForm.projectid,
                                    branchtype: this.serverForm.branchtype,
                                    envtype: this.serverForm.envtype
                                });
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        created() {
            getGroups().then(data=>{
                this.formInline.group = data.data;
                this.serverForm.group = data.data;
            }).then(()=>{
                this.refresh();
            });
        }
    };
</script>
