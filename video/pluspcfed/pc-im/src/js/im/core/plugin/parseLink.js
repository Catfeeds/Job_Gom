


export const parseLink = ( str ) => {
    let r = /((http|https):\/\/)?(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\.\/-~-]*)?/g;
    return str.replace(r, function(s, $1, name) {
    	let link = s.indexOf('http://') === -1 && s.indexOf('https://') === -1 ? 'http://'+s : s;
        return '<a href="'+link+'" target="_blank" class="link">'+s+'</a>';
    });
};