/**
 * Created by lishengyong on 2016/11/2.
 */


$(function () {

    var vm = new Vue({
        el: '#app',
        data: {
            appName: 'builderUP',
            tipMsg:'',
            updateTipData:[],
            compiledProjNames:[],
            compiledProjects:[],
            zCompiledNodes:[]
        },
        created: function () {
            // `this` 指向 vm 实例
            this.getcompileProj();
        },
        methods: {
            getUpdateTipProj: function () {
                var me = this;
                console.log('query projects');
                $.getJSON('updateTip/getProj', function (data) {
                    var projects = {};
                    if(data.data) {
                        projects = data.data.projects;
                    }
                    var res = [];
                    for(var i in projects) {
                        res.push(projects[i]);
                    }
                    me.updateTipData = res;
                });
            },
            getcompileProj:function () {
                var me = this;
                console.log('query compileProj');
                $.getJSON('compileAndPush/getcompileProj', function (data) {
                    if(data.data) {
                        var namaesRes = [],
                            projRes = [],
                            tempO = {};
                        var keys = Object.keys(data.data);
                        for(var i in keys) {
                            tempO = {};
                            namaesRes.push(keys[i]);
                            tempO.name = keys[i];
                            tempO.value = data.data[keys[i]];
                            projRes.push(tempO);
                        }
                        me.compiledProjNames = namaesRes;
                        me.compiledProjects = projRes;
                        console.log(JSON.stringify(this.compiledProjNames));
                    }
                });
            },
            updateTipInit: function () {
                // 数据校验
                if(!remoteURL.value || remoteURL.value && remoteURL.value.trim().length == 0) {
                    this.tipMsg = '请输入引用仓库路径';
                    return;
                }
                $.ajax({
                    url: "updateTip/init",
                    type: "POST",
                    data: $('#updateTipForm').serialize(),
                    success: function (data) {
                       console.log(data);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            },
            resetForm: function (form) {
                var rform = $('form[name="' + form + '"]');
                if(rform && rform[0]) {
                    rform[0].reset();
                }
            },
            updateGomePlusUI: function () {
                var url = "/updateUI?gitUrl=" + encodeURIComponent('http://gitlab.intra.gomeplus.com/gomeplusFED/gomeplusUI.git');
                var updateConotent = [];
                $('input[name="inlineCheckbox"]:checked').each(function (i, item) {
                    updateConotent.push(item.value);
                });
                url += '&updateConotent=' +  updateConotent.join(',');
                $('#gomePlusUI').attr('href', url);
            },
            contentChecked: function (event) {
                $('input[name="inlineCheckbox"]').each(function (i, item) {
                    if(event.target.value == 'default' || event.target.value == 'default-clean') {
                        var currChecked = event.target.checked;
                        $('input[name="inlineCheckbox"]').attr('checked', false);
                        if(currChecked) {
                            event.target.checked = false;
                        } else {
                            event.target.checked = true;
                        }
                    } else {
                        $('input[name="inlineCheckbox"][value="default"]').attr('checked', false);
                        $('input[name="inlineCheckbox"][value="default-clean"]').attr('checked', false);
                    }
                });
            },
            setUpdateTip: function (event) {
                console.log(event.target);
                var repository = event.target.getAttribute("data-sourceUrl");
                var branch = event.target.getAttribute("data-sourceBranch");
                var directory = event.target.getAttribute("data-directory");
                console.log(repository + '   '  + branch + '   ' + directory);
                $('#remoteURL').val(repository);
                $('#remoteURLBranch').val(branch);
                $('#tipDirectory').val(directory);
            },
            /**
             * 已经构建分支的选择
             * @param event
             */
            setCompileInit: function (event) {
                var distGitUrl = event.target.getAttribute("data-disturl");
                var sourceBranch = event.target.getAttribute("data-sourcebranch");
                var sourceGitUrl = event.target.getAttribute("data-sourceurl");
                var distBranch = event.target.getAttribute("data-distbranch");
                var bizTypeText = event.target.getAttribute("data-bizType");
                $('#sourceGitUrl').val(sourceGitUrl);
                if(sourceGitUrl) {
                    queryBranch();
                }
                $('#sourceBranch').val(sourceBranch);
                $('#distGitUrl').val(distGitUrl);
                $('#distBranch').val(distBranch);
                $('#bizTypeText').val(bizTypeText);
            },
            deleteProject: function (projName) {
                var me = this;
                console.log(projName);
                $.ajax({
                    url:'compileAndPush/deleteProj',
                    type:'json',
                    method:'post',
                    data:{projName:projName},
                    success:function (data) {
                        if(data && data.code == 200) {
                            var namaesRes = [],
                                projRes = [],
                                tempO = {};
                            var keys = Object.keys(data.data);
                            for(var i in keys) {
                                tempO = {};
                                namaesRes.push(keys[i]);
                                tempO.name = keys[i];
                                tempO.value = data.data[keys[i]];
                                projRes.push(tempO);
                            }
                            me.compiledProjNames = namaesRes;
                            me.compiledProjects = projRes;
                        }
                        console.log(data);
                    },
                    error:function (err) {
                        console.log(err);
                    }
                })
            }
        }
    });

    /**
     * 退出登录
     */
    document.getElementById('logout').addEventListener('click', function () {
        var form = document.createElement('form');
        form.action = '/logout';
        form.method = 'POST';
        form.submit();
    });

    /**
     * 菜单切换
     */
    $("#menu li").on('click', function () {
        var clickThis = this;
        $("#menu li").each(function () {
            var target = $(this).attr('data-target');
            if(clickThis == this) {
                // $("#" + target).show();
                $("#" + target).removeClass('hide');
                $(this).addClass('active');
            } else {
                // $("#" + target).hide();
                $("#" + target).addClass('hide');
                $(this).removeClass('active');
            }
        });

    });

    $("div.commitBtn button").hover(function () {
        $(this).popover('toggle');
    })

    /**
     * 初始化项目以及编译推送
     */
    $(".commitBtn").on('click', 'button',function () {
        var me = this;
        setLoading('#' + $(this).attr('id'));
        var param = {};
        param.sourceGitUrl = $('#sourceGitUrl').val();
        param.sourceBranch = $('#sourceBranch').val();
        param.distGitUrl = $('#distGitUrl').val();
        param.distBranch = $('#distBranch').val();
        param.bizType = $('#bizTypeText').val();
        param.isClear = $(this).attr('data-isClear');
        param.zTreeNodes = [];

        if($(this).attr('id') == 'push') {
            var treeObj = $.fn.zTree.getZTreeObj("compiledFileTree");
            var nodes = treeObj.getCheckedNodes(true);
            for(var i in nodes) {
                if(nodes[i].pId == null) {
                    param.zTreeNodes.push(JSON.stringify(nodes[i]));
                }
            }
            if(!(nodes && nodes.length > 0)) {
                $('#resultTip').html('必须选择相应的文件才能单独推送...');
                stopLoading();
                return ;
            }
        }

        if(!(param.sourceGitUrl && param.sourceBranch && param.distGitUrl && param.distBranch && param.bizType)) {
            $('#resultTip').html('请完善信息...');
            stopLoading();
            return ;
        }
        if(!isGitRepo(param.sourceGitUrl)
            || !isGitRepo(param.distGitUrl)) {
            $('#resultTip').html('请输入正确的git仓库路径');
            stopLoading();
            return;
        }
        switch (param.distBranch) {
            case 'master':
                $('#resultTip').html('业务仓库分支不能为master');
                stopLoading();
                return;
                break;
            /*case 'develop':
             $('#resultTip').html('业务仓库分支不能为develop');
             stopLoading();
             return;
             break;*/
            case 'release':
                $('#resultTip').html('业务仓库分支不能为release');
                stopLoading();
                return;
                break;
            default:
        };
        $.ajax({
            url:$(this).attr('data-formAction'),
            type:'json',
            method:'post',
            data:param,
            success:function (data) {
                console.log(data);
                if(data && data.message) {
                    $('#resultTip').html(data.message);
                } else {
                    $('#resultTip').html('');
                }
                $(me).popover('destroy');

                // 处理新建项目， 把返回的数据绑定vue 的vm
                if(data.data && Object.keys(data.data).length > 0) {
                    var namaesRes = [],
                        projRes = [],
                        tempO = {};
                    var keys = Object.keys(data.data);
                    for(var i in keys) {
                        tempO = {};
                        namaesRes.push(keys[i]);
                        tempO.name = keys[i];
                        tempO.value = data.data[keys[i]];
                        projRes.push(tempO);
                    }
                    vm.compiledProjNames = namaesRes;
                    vm.compiledProjects = projRes;
                }
                if(data.zTreeData) {
                    for(var i in data.zTreeData) {
                        console.log(JSON.stringify(data.zTreeData[i]));
                    }
                    // 编译成功
                    var setting = {
                        check: {
                            enable: true
                        },
                        data: {
                            simpleData: {
                                enable: true
                            }
                        }
                    };
                    /*vm.zCompiledNodes = [
                        {id: 1, pId: 0, name: "随意勾选 1", open: true},
                        {id: 11, pId: 1, name: "随意勾选 1-1", open: true},
                        {id: 111, pId: 11, name: "随意勾选 1-1-1"},
                        {id: 112, pId: 11, name: "随意勾选 1-1-2"},
                        {id: 12, pId: 1, name: "随意勾选 1-2", open: true},
                        {id: 121, pId: 12, name: "随意勾选 1-2-1"},
                        {id: 122, pId: 12, name: "随意勾选 1-2-2"},
                        {id: 2, pId: 0, name: "随意勾选 2", checked: true, open: true},
                        {id: 21, pId: 2, name: "随意勾选 2-1"},
                        {id: 22, pId: 2, name: "随意勾选 2-2", open: true},
                        {id: 221, pId: 22, name: "随意勾选 2-2-1", checked: true},
                        {id: 222, pId: 22, name: "随意勾选 2-2-2"},
                        {id: 23, pId: 2, name: "随意勾选 2-3"}
                    ];*/
                    vm.zCompiledNodes = data.zTreeData;
                    $.fn.zTree.init($("#compiledFileTree"), setting, vm.zCompiledNodes);
                }
                stopLoading();
            },
            error:function (err) {
                console.log(err);
                $(me).popover('destroy');
                stopLoading();
            }
        });
    });

    /**
     * 业务分支类型选择
     */
    $("#bizTypeBtn ul li a").on('click', function () {
        console.log($(this).html());
        $('#bizTypeText').val($(this).html());
    })

    /**
     * 设置按钮为加载中状态
     * @param clazz
     */
    function setLoading(clazz) {
        var l = Ladda.create( document.querySelector( clazz ) );
        l.start();
        l.setProgress( 0.5 );
        l.stop();
        l.toggle();
        l.isLoading();
    }

    /**
     * 取消按钮加载中状态
     */
    function stopLoading() {
        Ladda.stopAll();
    }

    /**
     * 重置表单
     */
    $('#reset').on('click', function () {
        $('#sourceGitUrl').val('');
        $('#sourceGitUrl').blur();
        $('#sourceBranch').val('');
        $('#distGitUrl').val('');
        $('#distBranch').val('');
        $('#bizTypeText').val('');
        $('#resultTip').html('');
        $('#branchesSrc').html('');
    });

    function queryBranch() {
        var sourceGitUrl = $('#sourceGitUrl').val();
        sourceGitUrl = sourceGitUrl.trim();
        $.ajax({
            url:'branch/get',
            type:'json',
            method:'get',
            data:{sourceGitUrl:sourceGitUrl},
            success:function (data) {
                $('#branchesSrc').html('');
                console.log(data);
                var branchs = '';
                if(data && data.data) {
                    for(var i = 0, len = data.data.length; i < len; ++i) {
                        if(data.data[i].name === 'master' || data.data[i].name === 'develop') {
                            branchs += '<li class="disabled"><a href="#">' + data.data[i].name + '</a></li>'
                        } else {
                            branchs += '<li><a href="#">' + data.data[i].name + '</a></li>'
                        }
                    }
                }
                $('#branchesSrc').append(branchs);
                $('#branchesSrc li a').on('click', function () {
                    $('#sourceBranch').val($(this).text());
                    switch($(this).text()){
                        case 'master':
                        case 'develop':
                            $('#resultTip').html('源仓库分支不建议使用'+$(this).text());
                            break;
                        default:
                    }
                });
            },
            error:function (data) {
                console.log(data);
            }
        });
    }

    /**
     * 选择源路径默认值
     */
    $('#gitUrlSrc li a').on('click', function () {
        $('#sourceGitUrl').val($(this).text());
        queryBranch();
    });

    $('#distGitUrl').change(function () {
        console.log($(this).val());
        if(!isGitRepo($(this).val())) {
            $('#resultTip').html('请输入正确的git仓库路径');
            return;
        } else {
            $('#resultTip').html('');
        }
    });

    function isGitRepo(url) {
        if(url && url.indexOf('.git') < 0) {
            return false;
        }
        return true;
    }

    $('#help').on('click', function () {

    })

})
