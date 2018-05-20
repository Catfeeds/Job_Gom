var fetch = require('io/fetch');
var url = require('io/url');

var kid = '';
var shareKid = function(){
    fetch.get(url.get('shareKid'), {
        async: false
    }).done(function(data) {       
        if(data.success === true){
            kid = data.data.kid;
        }
    })
    return kid;
}
module.exports = shareKid;
