{{each images as value i}}
<li   class="imgClass">
	<a href="javascript:;" >
		<img  src="{{value}}" width=100 height=100 data-node="imgSrc" data-oldImg="{{value}}">
		<!--<em class="icon-del" data-node="deletImg"></em> -->
		<div  data-roteNum=0 class="icon-del" >
			<em class="iconImg roteLeft" data-node="roteRo" ></em>
			<em class="iconImg roteRight" data-node="roteRo" ></em>
			<em class="iconImg deletImg" data-node="deletImg"></em>
		</div>
	</a>
</li>
{{/each}}

