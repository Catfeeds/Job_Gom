var gomeGER = new GER({
    url: $_CONFIG['group_domain'] + 'ajax/log/index?err_msg=',
    proxyJquery: true,
    proxyTimer: true,
    except:  [ /^Script error\.?/, 
    			/^Javascript error: Script error\.? on line 0/, 
    			function(){
    				if(typeof(isDevelop) !== 'undefined'){
    					return true
    				}
    			} 
    		]
});
window.gomeGER = gomeGER;
