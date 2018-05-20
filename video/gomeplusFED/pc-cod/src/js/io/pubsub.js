
/**
 * [使用方法]
 * http://api.jquery.com/jQuery.Callbacks/
 */
var topics = {};

var Pubsub = function(channel) {
    var callbacks, 
        method,
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

module.exports = Pubsub;
