function getToken(got,fail){
	$.ajax({
		type:'post',
		url:$GLOBAL_CONFIG['ucenter_domain']+'im/getToken',
		success:function(data){
			got(data)
		},
		error:function(){
			fail()
		}
	})
}
export default getToken;