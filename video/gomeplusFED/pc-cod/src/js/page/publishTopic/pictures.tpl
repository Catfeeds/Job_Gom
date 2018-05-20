{{each images as v}}
<div data-node="listItemBox">
	<div class="zone-img-box hover-dele">
		<em data-action="removeItem" data-actiontype="picture" class="icon">&#xe92c;</em>
		<img src="{{v}}">
	</div>
	<textarea data-action="textBox" data-node="pictureDesc" data-info='{"type":"image","text":"","url":"{{v}}"}' type="text" placeholder="输入描述（选填，字数不限）" class="publish-input"></textarea>
</div>
{{/each}}