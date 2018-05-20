<?php
    $csspath = "setup.css";
    $jspath = "/js/conf/setup.js";
?>

<include file="Front/Public/header" />
        <div class="meihao clearfix">
            <include file="Front/Public/left" />
            <div class="setup">
                <div class="setup-title clearfix">
                    <h3>账号信息</h3>
                    <empty name="modifyInfo">
                        <div class="revamp"><div class="revamp-btn"><a href="<{$meihao_domain}>setting/modify" target="_blank">修改</a></div></div>
                    <else />
                        <div class="cause-process <if condition="$modifyInfo['auditStatus'] eq 0">revamp-show</if>">您修改的新资料正在审核中，请耐心等待</div>
                        <div class="cause-fail <if condition="$modifyInfo['auditStatus'] eq -1">revamp-show</if>">您提交的资料修改审核未通过，原因：<{$modifyInfo.auditFailReason}>如需修改请重新操作</div>
                        <div class="revamp">
                            <if condition="$modifyInfo['auditStatus'] eq 0"><div class="revamp-btn"><a data-node="revamp-btn" href="javascript:" >取消修改</a></div></if>
                            <if condition="$modifyInfo['auditStatus'] eq -1"><div class="revamp-btn"><a href="<{$meihao_domain}>setting/modify" target="_blank">修改</a></div></if>
                            <div data-node="revamp-popup" class="revamp-popup">
                              <div class="popup-pic"></div>
                              <p>取消本次修改审核？</p>
                              <div class="popup-confirm clearfix">
                                  <a data-node="confirm" class="confirm" href="javascript:;">确认</a>
                                  <a data-node="cancel" class="cancel" href="javascript:;">取消</a>
                              </div>
                            </div>
                        </div>
                    </empty>
                </div>
                <div class="setup-info clearfix">
                    <div class="info-left">账号类型</div>
                    <div class="info-right">
                        <if condition="$basicInfo['type'] eq 0">
                            个人号
                            <elseif condition="$basicInfo['type'] eq 1"/>
                            企业号
                        </if>
                    </div>
                </div>
                <div class="setup-info clearfix">
                    <div class="info-left">名称</div>
                    <div class="info-right"><{$basicInfo['name']}></div>
                    <notempty name="modifyInfo">
                        <if condition="$modifyInfo['name'] neq $basicInfo['name']">
                        <div class="revamp-process clearfix <if condition="$modifyInfo['auditStatus'] eq 0">revamp-show</if>">
                            <div class="new-left">新名称修改审核中：</div>
                            <div class="new-right"><{$modifyInfo['name']}></div>
                        </div>
                        <div class="revamp-fail clearfix <if condition="$modifyInfo.auditStatus eq -1">revamp-show</if>">
                            <div class="new-left">新名称：</div>
                            <div class="new-right"><{$modifyInfo['name']}></div>
                        </div>
                        </if>
                    </notempty>
                </div>
                <div class="setup-info clearfix">
                    <div class="info-left">头像</div>
                    <div class="info-right info-head">
                        <div class="head"> <img src="<{$basicInfo['imageUrl']}>" alt=""></div>
                    </div>
                    <notempty name="modifyInfo">
                        <if condition="$modifyInfo['imageUrl'] neq $basicInfo['imageUrl']">
                        <div class="revamp-process clearfix <if condition="$modifyInfo['auditStatus'] eq 0">revamp-show</if>">
                            <div class="new-left new-head">新头像修改审核中：</div>
                            <div class="new-right info-head">
                                <div class="head"> <img src="<{$modifyInfo['imageUrl']}>" alt=""></div>
                            </div>
                        </div>
                        <div class="revamp-fail clearfix <if condition="$modifyInfo.auditStatus eq -1">revamp-show</if>">
                            <div class="new-left new-head">新头像：</div>
                            <div class="new-right info-head">
                                <div class="head"> <img src="<{$modifyInfo['imageUrl']}>" alt=""></div>
                            </div>
                        </div>
                        </if>
                    </notempty>
                </div>
                <div class="setup-info clearfix">
                    <div class="info-left">标签</div>
                    <div class="info-right"><{$basicInfo['category']['name']}></div>

                    <notempty name="modifyInfo">
                        <if condition="$modifyInfo['category']['name'] neq $basicInfo['category']['name']">
                        <div class="revamp-process clearfix <if condition="$modifyInfo.auditStatus eq 0">revamp-show</if>">
                            <div class="new-left">新标签修改审核中：</div>
                            <div class="new-right"><{$modifyInfo['category']['name']}></div>
                        </div>
                        <div class="revamp-fail clearfix <if condition="$modifyInfo.auditStatus eq -1">revamp-show</if>">
                            <div class="new-left">新标签：</div>
                            <div class="new-right"><{$modifyInfo['category']['name']}></div>
                        </div>
                        </if>
                    </notempty>
                </div>
                <div class="setup-info clearfix">
                    <div class="info-left">简介</div>
                    <div class="info-right">
                        <p class="right-intro"><{$basicInfo['introduction']|htmlspecialchars}></p>
                    </div>
                    <notempty name="modifyInfo">
                        <if condition="$modifyInfo['introduction'] neq $basicInfo['introduction']">
                        <div class="revamp-process new-intro clearfix <if condition="$modifyInfo.auditStatus eq -0">revamp-show</if>">
                            <div class="new-left">新简介修改审核中：</div><{$modifyInfo['introduction']|htmlspecialchars}>
                        </div>
                        <div class="revamp-fail new-intro clearfix <if condition="$modifyInfo.auditStatus eq -1">revamp-show</if>">
                            <div class="new-left">新简介：</div><{$modifyInfo['introduction']}>
                        </div>
                        </if>
                    </notempty>
                </div>
                <div class="setup-info clearfix">
                    <div class="info-left">绑定圈子</div>
                    <div class="info-right"><{$basicInfo['group']['name']}></div>
                </div>
                <if condition="$basicInfo['type'] eq 1">
                    <div class="setup-title pt20 clearfix">
                        <h3>企业信息</h3>
                    </div>
                    <div class="setup-info clearfix">
                        <div class="info-left">企业名称</div>
                        <div class="info-right"><{$basicInfo['enterpriseName']}></div>
                    </div>
                    <div class="setup-info clearfix">
                        <div class="info-left">营业执照注册号</div>
                        <div class="info-right"><{$basicInfo['businessLicenseNumber']}></div>
                    </div>
                    <div class="setup-info clearfix">
                        <div class="info-left">营业执照</div>
                        <div class="info-right info-license">
                            <div class="license"><img src="<{$basicInfo['businessLicenseImageUrl']}>" alt=""></div>
                        </div>
                    </div>
                    <div class="setup-info clearfix">
                        <div class="info-left">运营者姓名</div>
                        <div class="info-right"><{$basicInfo['operatorName']}></div>
                    </div>
                    <div class="setup-info clearfix">
                        <div class="info-left">运营者身份证号</div>
                        <div class="info-right"><{$basicInfo['operatorIDNumber']}></div>
                    </div>
                    <div class="setup-info clearfix">
                        <div class="info-left">运营者手机号</div>
                        <div class="info-right"><{$basicInfo['operatorPhone']}></div>
                    </div>
                    <div class="setup-info clearfix">
                        <div class="info-left">QQ/微信/邮箱</div>
                        <div class="info-right"><{$basicInfo['operatorContactInfo']}></div>
                    </div>
                </if>
            </div>
        </div>
  <include file="Home@Public:mh_footer"/>
