<div data-node="commentBox" class="topic-review-box">
    <h2 class="review-title">参与评论</h2>
    <div class="bjfff margin-btom20" data-node="comment_FirDiv">
        <div class="text-field-box clearfix">
            <div class="topic-user-head">
                {{if isExpert}}
                <em class="icon-daren"></em>
                {{/if}}
                <img src="{{userImage}}" onerror="imgError(this, 'g')">
            </div>
            <div class="topic-publish-content" data-node="comment_Msg" data-nickname="" data-tid="{{id}}"  data-userid="0" data-headface="{{userImage}}">
                <textarea placeholder="说点什么吧…" class="textarea-bx" {{readyOnly}} style="background: rgb(255, 255, 255);"></textarea>
                <div data-node="addImgGoods" data-imgNum ="9">
                    <ul data-node="imgUl" class="clearfix hide">
                         <li data-node="addMoreImg"><a href="javascript:;"><em class="iconn-41"></em></a></li>
                    </ul>
                </div>
                <div class="publish-face-bx" data-publish="{{id}}">
                    <p class="icon-face cursor-pointer" data-node="smilies_Face"><em class="iconn-27"></em>表情</p>
                    <p class="icon-face cursor-pointer" data-node="addImg_btn"><em class="iconn-28"></em>图片</p>
                    <p class="icon-face cursor-pointer" data-node="addGoods_btn"><em class="iconn-29"></em>商品</p>
                    <a href="javascript:;" class="pc-btn pc-btnh30 pc-btnw105 {{isLoginClass}}" data-node="a_Submit">{{isLoginStr}}</a>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="comment-title" data-node="hidDiv">
    <div class="bd-bottom"><span class="red">{{allNum}}</span><span>条评论</span></div>
</div>
