{{each images as value i}}
<li data-node="deletImg"  class="imgClass">
	<a href="javascript:;" data-node="">
		<img  src="{{value}}" width=100 height=100 >
		<em class="icon-del" ></em>
	</a>
</li>
{{/each}}

