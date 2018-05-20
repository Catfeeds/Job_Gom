//重新覆盖默认文本过滤规则

UE.plugin.register('fillterRules', function (){
	var me  =this;
	var txtRules = {
        'img': {
            $: {
                'src': 1,
                'data-type': 1,
                '_src': 1,
                'angle': 1,
                'width': 1,
                'height': 1,
                'data-original': 1,
                'proto': 1,
                'data-node':1,
                'video-path':1,
                'video-id':1,
                'des':1,
                'len':1
            }
        }
    }
	me.addListener('ready',function(){
		var filterTxtRules = me.options.filterTxtRules
		UE.utils.extend(me.options.filterTxtRules, txtRules);
   		me.setOpt("filterTxtRules", filterTxtRules);
	})
	

    

})
 