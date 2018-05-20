/* eslint-disable */

var str = '<div class="test"  contenteditable="false" data-node="gmp-ebox" data-info= {"id":"123","shopId":"456","kid":"789"}>'+ 
			'<div data-node="goodsItem" class="publish-item hover-dele">'+
			 '<a href="http://mall.dev.gomeplus.com/product/475-2430.html" target="_blank" class="img-out"> <img src="https://i-pre.meixincdn.com/T1haCTBvJT1RXrhCrK.230x230cTzq80.jpg" data-node="999"> </a>'+
			  '<div class="publish-cont">'+
			   '<h3 class="pub-tl"> <a href="http://mall.dev.gomeplus.com/product/475-2430.html" target="_blank">情人节必备</a> </h3>'+
			    '<div class="pub-row"> <span class="red">￥</span><strong class="money-inf">0.01</strong> </div>'+
			     '<a href="http://mall.dev.gomeplus.com/product/475-2430.html" target="_blank" class="scan-more">查看详情</a> '+
			     '</div>'+
			     ' </div>'+
			     '<b data-node="ifs" style="position:absolute;top:0;left:0;width:1008px;background:#f00;height:230px;display:none;opacity:0.3;z-index:99999">122</b>'+
			     '</div>'
		
		//require('editor/rewrite/insertGoods')		 
var init = function(ue){
//test
	$(function(){
		
		ue.addListener('ready', function(){
			var $body = $("iframe").contents().find("body");
			//console.log($body)
			$body.click(function(){
				//console.log($body.find("[data-node='gmp-ebox']"))
			})
				$body.on("[data-node='gmp-ebox']","click",function(){
					//console.log($(this))
					var range = ue.selection.getRange();
					range.select();
					var s  =[].concat(ue.selection.getStartElementPath());
					//console.log(s,1122)
				})

		})
/*
		UE.Editor.addListener( 'selectionchange', function( editor ) {
		     console.log('选区发生改变');
		 })
		*/
		
		/*
		ue.addListener( 'selectionchange', function( editor ) {
		     console.log('选区发生改变');
		 })*/
		/*console.log(ue);
		for(var i in ue){
			console.log(i)
		}*/
		/*
		var ifrm1 = document.getElementById('ueditor_0');
		console.log(ifrm1)
        var j = ifrm1.contentWindow.document*/
        
		//console.log(UE.dom)
		
/*		
document.addEventListener("selectionchange", function(e) {
  console.log(e); 
}, false);
*/
		
		ue.addListener("mousedown",function(type,e){
			//console.log(this)
			//ue.fireEvent("selectionchange");
			var range = ue.selection.getRange();
			range.select();
			var s  =[].concat(ue.selection.getStartElementPath());
			var j = range.getClosedNode();
			//debugger
			//console.log(j,999)
			var parents = $(s[0]).parents('[data-node=goodsItem]')
			//console.log(parents,122)
			if(parents.length > 0 ){
				//debugger;
				//console.log(parents.get(0))
				//parents.find('[data-node=ifs]').show();
				//range.setStart(parents.prev().get(0),0)
				//range.setEnd(parents.next().get(0),0)
				//range.select();
				//console.log(parents.get(0))
				//range.selectNode( parents.get(0) );
				//range.select();
				//console.log(range)
				//range.setStart(p, 0).setCursor();
			}
			return false;

		})

		
		ue.addListener("keydown",function(type,e){
			e = e || window.event;
			//console.log(e.keyCode)
			
			var range = ue.selection.getRange();
			
			var parents = $(range.endContainer.parentElement).parents('[data-node=listItemBox]');
			if(  parents.length ){
				//range.setStartAfter(parents[0].previousSibling).setCursor();	
				range.setStart(parents[0].previousSibling,-1).setCursor()
			}
			
			
			
			
			switch(e.keyCode){
				case 37: //左键
					
					var range = ue.selection.getRange();
					 var parents = $(range.endContainer.parentElement).parents('[data-node=listItemBox]');
					if(  parents.length ){
						//range.setStartAfter(parents[0].previousSibling).setCursor();	
						range.setStart(parents[0].previousSibling,-1).setCursor()
					}
					break;
				
				case 39://右键
					var range = ue.selection.getRange();
					 var parents = $(range.endContainer.parentElement).parents('[data-node=listItemBox]');
					if(  parents.length )
						range.setStart(parents[0].nextSibling,0).setCursor()
					break;
				
				}
			})

		var str2 = '123<b>000<em>111</em>0</b>321';
		var tempstr = '<p><img src="https://i-pre.meixincdn.com/T1haCTBvJT1RXrhCrK.230x230cTzq80.jpg"/></p>'
		$("#insert").on("click",function(){
			ue.execCommand('insertHtml', tempstr,true);
			ue.focus();
		})
/*
		$("#insert2").on("click",function(){
			ue.execCommand('insertHtml', '1234567890',true);
		})
*/
		$("#insert2").on("click",function(){
			//ue.execCommand('insertgoodshtml', tempstr,true);
			// console.log(UE.htmlparser('<p><b>htmlparser</b></p>', true));
			ue.execCommand('haha', tempstr,true);
		})

		$("#viewCode").on("click",function(){
			var nodes = ue.document.body.children;
			var arr=[];
			for(var i = 0;i< nodes.length;i++){
				var tagNode = nodes[i];
				if(tagNode.tagName ="P"){
					//var txt = thisNode.innerHTML; 
					var childNodes = tagNode.childNodes;	
					
					for(var j = 0;j < childNodes.length;j++){
						var _thisNode = childNodes[j]
						if(_thisNode.nodeType == 3){
							var _thisValue = _thisNode.nodeValue;
							if( _thisValue !== "" || _thisValue !== "&#8203"){
								arr.push({"type":"text","text":_thisValue});
								console.log(_thisValue,typeof _thisValue)
							}								
						}else{
							if(_thisNode.tagName == "IMG")
								arr.push({"type":"image","text":"美图","url":_thisNode.src});
							if(_thisNode.tagName =="BR"){
								arr.push({"type":"text","text":'<br/>'})
							}
						}	
					}
					
					 /*
					var reg = /<img.*?>/gi;
					var j = txt.split(reg)
					console.log(j)
					
					var newStr = '<p>';
					var j = txt.match(reg) ;
					*/
					//var j =txt.replace(/<img.*?>/g,'hahaha');
					//console.log(j,12)
				}
				if(tagNode.tagName == "DIV"){
					var data = tagNode.attributes.data.value;					
					data = JSON.parse(data);
					arr.push({	"type":"item",
								"text":"sg","id":data.id,
								"shopId":data.shopId,
								"kid":data.kid});
				}
			}
			console.log(arr);
		})

		$("#submitCode").on("click",function(){
			//ue.execCommand('insertHtml', '1234567890',true);
			var t = ue.getContent()
			function htmlNull(str) {
			    var re = str.replace(/\n|\r\n/g, "</br>");
			    return re; //去掉所有的html标记
			}
			 console.log( htmlNull(t) );
		})

		$("#del").on("click",function(){
			var range = ue.selection.getRange();
			range.select();
			var s  =[].concat(ue.selection.getStartElementPath());
			
			var parents = $(s[0]).parents('[data-node=listItemBox]')
			if(parents.length > 0 ){
				console.log(parents.get(0))
				//parents.find('[data-node=mask]').show();
				range.setStart(parents.prev().get(0),0)
				range.setEnd(parents.next().get(0),0)
				range.select();
			}
		})
	})
}				 
module.exports = {
    init: init
};
