var rewriteTxtRules = function(ue, fn) {
    var txtRules = fn(ue);
    var newRules = ue.options.filterTxtRules;
    UE.utils.extend(newRules, txtRules);
    ue.setOpt("filterTxtRules", newRules)
}

var rules = function() {

    return {
        'img': {
            $: {
                'style': 1,
                'src': 1,
                'data-type': 1
            }
        }
    }
}

var init = function(ue) {
    //过滤图片和替换表情
    rewriteTxtRules(ue, rules);

}

module.exports = init;