var fetch = require('io/fetch');
var url = require('io/url');
var imgReplace = require('utils/imgReplace');

function fetchData(obj,fn){
	var data = obj.data;
	var editor = obj.editor;
	var insertAble = false;
	fetch
        .get(url.get('getVideoPath'), {
            data: {
                video_id:data
            },
            async:false
        })
        .done(function(datas) {
        	if(datas.success == true){

                var _data = datas.data;

                var  o = {
                    src : _data.image,        //图片地址
                    id : _data.video_id,    //视频id
                    des : _data.description,        //视频描述
                    len : _data.length,        //视频大小
                    url : _data.videos[0].address   //视频地址

                }
	        	insertVideo(editor,o);

	        	insertAble = true;
        	}else{
        		$('[data-node="video-msg"]').text('未找到相应的视频，请重新输入');//暂时写死
        	}

        })
    return insertAble;
}

function insertVideo(editor,o){
    var proto = imgReplace.imgProto(o.src);
    var src = imgReplace.imgReplace(o.src);
    var path =  imgReplace.imgReplace(o.url);

	var img = "<img src='" + src +
                "' video-id='" + o.id +
                "' data-node='video' video-path='" + path +
                "' des='" + o.des +
                "' len='" + o.len +
                "' proto='" + proto + "'/>";
	editor.execCommand('insertHTML',img)
}

module.exports = fetchData
