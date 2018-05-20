<div class="aside-talent">
    <dl class="talent-list">
        <dt class="list-title">
            <a href="/expert/home" <?php if($activeUrl == 'expert/home'){ ?> class="active" <?php } ?>>我的首页</a>
        </dt>
        <dd>
            <a <?php if($activeUrl == 'expert/publish'){ ?> class="active" <?php } ?> href="/expert/publish">发布话题 </a>
        </dd>
        <dd>
            <a <?php if($activeUrl == $i_domain.'drafts/index'){ ?> class="active" <?php } ?> href="/expert/draftsIndex">草稿箱 </a>
        </dd>
        <dd>
            <a <?php if($activeUrl == $i_domain.'published/index'){ ?> class="active" <?php } ?> href="/expert/publishedList">已发话题</a>
        </dd>
        <dd class="list-protocol">
            <a href="/expert/protocol" <?php if($activeUrl == 'expert/protocol'){ ?> class="active" <?php } ?>>达人协议</a>
        </dd>
    </dl>
</div>