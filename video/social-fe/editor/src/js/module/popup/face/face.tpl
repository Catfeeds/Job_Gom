<div data-node="faceBox" class="imoj-box" style="position: absolute;z-index: 9999;display:none">
    <em class="sanjiao"></em>
    <div data-node="faceList" class="imoj-list">
        {{each list as v i}}
        <div class="imoj-content clearfix {{if i}}hide{{/if}}">
            {{each v as face}}
            <a href="javascript:;">
                <img width="22" height="22" data-face="[{{face.name}}]" src="{{face.url}}" alt="{{face.name}}" title="{{face.name}}">
            </a>
            {{/each}}
        </div>
        {{/each}}
    </div>
    <ul data-action="facePage" class="pagination">
    {{each page as v i}}
        <li {{if i==0}}class="active"{{/if}}>{{i+1}}</li>
    {{/each}}
    </ul>
</div>