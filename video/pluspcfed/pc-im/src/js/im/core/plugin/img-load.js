//图片预加载
//export const byteLen = ( str, len ) => {

export const  imgLoad = ( url, success, fail ) => {
    let img = new Image();
    let successFn = success || function(){};
    let failFn = fail || function(){};
    img.src = url;
    if (img.complete) {
        successFn.call( img );
    } else {

        img.onload = function () {
            successFn.call( img );
        };
        
        img.onerror = function(){

            failFn.call(img);

        }
    };
}
/**/