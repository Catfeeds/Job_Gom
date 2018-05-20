var rewriteTxtRules = function(ue, fn) {
    var txtRules = fn(ue);
    var newRules = ue.options.filterTxtRules;
    UE.utils.extend(newRules, txtRules);
    ue.setOpt("filterTxtRules", newRules)
}

var rules = function(ue) {

    return {
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
}

var init = function(ue) {
    //过滤图片和替换表情
    rewriteTxtRules(ue, rules);

}

module.exports = init;
