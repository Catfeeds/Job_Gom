/**
 * [gome editor]
 * @Author: Akesure
 * @Email:  xuyang-ds@gomeplus.com
 */

import * as constant from 'reduxs/constant/index';

const publish = (state = {moduleTags: [], setTop: {titleTop: 0, textareaTop: 0, tagTop: 0}}, action) => {
    switch (action.type) {
        case constant.PUBLIC_TAG:
            return Object.assign({}, state, {
                moduleTags: action.moduleTags
            });
        case constant.PUBLIC_TOP:
        console.log(state, action);
            return Object.assign({}, state, {
              setTop : {
                titleTop: 0,
                textareaTop: 0,
                tagTop: 0
              }
            })
        default:
            return state
    }
}
export default publish;
