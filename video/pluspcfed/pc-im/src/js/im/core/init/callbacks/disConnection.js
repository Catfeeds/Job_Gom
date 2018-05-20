import store from '../../vuex';

export const disConnection = () => {
		console.log('disConnection');
		store.state.initModule.isDisConnect = true;
		if( store.state.initModule.isDisConnect ){
			let msgList = store.state.msgInfoList.msgList;
	        for( let list in msgList ){
	            msgList[list].map((v,i)=>{
	            	if( v.loading && !v.fail ){
		                v.loading = false;
		                v.fail = true;
	            	}
	            })
	        }
		}
        


};
