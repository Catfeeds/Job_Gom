<div class="pluspc-mygomeGroup" data-small="pluspc-mygomeGroupS">

    <div class="mygomeGroup-btn clearfix">
        <div class="plus-mygomeGroup-fl  J-pluspc-tab">
            <a href="javascript:;" class="active" >热门圈子</a>
            <a href="javascript:;">我创建的圈子</a>
            <a href="javascript:;" >我加入的圈子</a>
        </div>
        <?php if(empty($myGroup['imaster']) || count($myGroup['imaster']) < 5){ ?>
        <div class="plus-mygomeGroup-fr">
            <a href="<{$mx_domain['group']}>index/create" target="_blank" class="pluspc-mygomeGroup-create J-pluspc-createGroup">创建圈子</a>
        </div>
        <?php } ?>
    </div>

    <div class="mygomeGroup-tab J-pluspc-tabBox"  style="display: block;" >
        <?php if(!empty($recGroup['groups'])){ ?>
        <div>
            <div class="tab-left" >
                <a href="javascript:;" class="J-pluspc-left pluspc-btn-disable"></a>
            </div>
            <div class="tab-right" >
                <a href="javascript:;" class="J-pluspc-right"></a>
            </div>
            <div class="tab-list J-tab-list">
                <ul class="clearfix" class="J-pluspc-list" >
                    <foreach name="recGroup.groups" item="val" key="key">
                    <li>
                        <a target="_blank" href="<{$mx_domain['group']}>circle/<{$val.group_id}>.html">
                            <div class="list-img">
                                <?php if(empty($val['cmsIcon'])){ ?>
                                    <img src="<{$pcimgpath}>/images/public/circle-default.png">
                                <?php }else{ ?>
                                    <img src="<?php echo getResizeImg($val['cmsIcon'], 100, 100, 'MEIXIN');?>">
                                <?php }?>
                            </div>
                            <p class="list-title">
                                <?php echo msubstr($val['cmsName'], 0, 6, C('DEFAULT_CHARSET'))?>
                            </p>
                        </a>
                    </li>
                    </foreach>
                    <li>
                        <div class="list-move">
                            <a href="<{$mx_domain['group']}>channel/index" target="_blank" >查看更多</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <?php }else{ ?>
            <div class="pluspc-mygomeGroup-normal">系统繁忙，请稍后再试<a href="<{$myhome_url}>" >点击刷新</a></div>
        <?php } ?>
    </div>
    <div class="mygomeGroup-tab J-pluspc-tabBox">

        <?php if(!empty($myGroup['imaster'])){ ?>
        <div>

            <div class="tab-left" >
                <a href="javascript:;" class="J-pluspc-left pluspc-btn-disable" ></a>
            </div>
            <div class="tab-right" >
                <a href="javascript:;" class="J-pluspc-right"></a>
            </div>
            <div class="tab-list J-tab-list">
                <ul class="clearfix" class="J-pluspc-list" >
                    <foreach name="myGroup.imaster" item="val" key="key">
                    <li>
                        <a target="_blank" href="<{$mx_domain['group']}>circle/<{$val.id}>.html">
                            <div class="list-img">
                                <?php if(empty($val['icon'])){ ?>
                                     <img src="<{$pcimgpath}>/images/public/circle-default.png">
                                <?php }else{ ?>
                                    <img src="<?php echo getResizeImg($val['icon'], 100, 100, 'MEIXIN');?>">
                                <?php }?>
                            </div>
                            <p class="list-title">
                                <?php echo msubstr($val['name'], 0, 6, C('DEFAULT_CHARSET'))?>
                            </p>
                        </a>
                    </li>
                    </foreach>
                </ul>
            </div>
        </div>
        <?php }else{ ?>
            <div class="pluspc-mygomeGroup-normal">我的地盘我做主~快去<a target="_blank" href="<{$mx_domain['group']}>index/create">创建圈子</a>吧！</div>
        <?php }?>
    </div>
    <div class="mygomeGroup-tab J-pluspc-tabBox" >
        <?php if(!empty($myGroup['imember'])){ ?>
        <div>

            <div class="tab-left" >
                <a href="javascript:;" class="J-pluspc-left pluspc-btn-disable"></a>
            </div>
            <div class="tab-right" >
                <a href="javascript:;" class="J-pluspc-right"></a>
            </div>
            <div class="tab-list J-tab-list">
                <ul class="clearfix" class="J-pluspc-list" >
                    <foreach name="myGroup.imember" item="val" key="key">
                    <li>
                        <a target="_blank" href="<{$mx_domain['group']}>circle/<{$val.id}>.html">
                            <div class="list-img">
                                <?php if(empty($val['icon'])){ ?>
                                    <img src="<{$pcimgpath}>/images/public/circle-default.png">
                                <?php }else{ ?>
                                    <img src="<?php echo getResizeImg($val['icon'], 100, 100, 'MEIXIN');?>">
                                <?php }?>
                            </div>
                            <p class="list-title">
                                <?php echo msubstr($val['name'], 0, 6, C('DEFAULT_CHARSET'))?>
                            </p>
                        </a>
                    </li>
                    </foreach>

                    <li>
                        <div class="list-move">
                            <a href="<{$mx_domain['i']}>group/all" target="_blank" >查看更多</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <?php }else{ ?>
            <div class="pluspc-mygomeGroup-normal">想要认识志同道合的朋友吗？快去<a target="_blank" href="<{$mx_domain['group']}>channel/index">加入圈子</a>吧！</div>
        <?php }?>
    </div>
</div>