/**
 * [使用方法]
 * http://api.jquery.com/jQuery.Callbacks/
 */
var topics = {};

//检测是否含有UE实例对象，有则添加到实例对象上
var checkInstance = function(){
    var ue;

    if(UE && !UE.utils.isEmptyObject(UE['instants'])){
        var instants = UE['instants'];
        for(var i in instants){
            if(instants.hasOwnProperty(i)){
                ue = instants[i];
                if(!ue.pubsub){
                    ue.pubsub = {};
                }
               
            }
        }

    }
    return ue;
}

var listener = function(topics,channel){
    var callbacks,
        topic = channel && topics[channel];

    if (!topic) {
        callbacks = jQuery.Callbacks();
        topic = {
            pub: callbacks.fire,
            sub: callbacks.add,
            unsub: callbacks.remove
        };
        if (channel) {
            topics[channel] = topic;
        }
    }
    
    return topic;

}


var Pubsub = function(channel) {

    var ue = checkInstance();

    if(ue){
        return listener(ue.pubsub,channel);
    }

    return listener(topics,channel);

    
};



module.exports = Pubsub;

/******原代码
var Pubsub = function(channel) {

   var callbacks,
        topic = channel && topics[channel];

    if (!topic) {
        callbacks = jQuery.Callbacks();
        topic = {
            pub: callbacks.fire,
            sub: callbacks.add,
            unsub: callbacks.remove
        };
        if (channel) {
            topics[channel] = topic;
        }
    }
    
    return topic;

    
};

********/