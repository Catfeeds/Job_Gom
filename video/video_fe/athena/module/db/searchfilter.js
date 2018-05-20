/**
 *
 Created by zhangzhao on 2017/5/24.
 Email: zhangzhao@gomeplus.com
 */
let conf={
    userid: {
        type : Number
    },
    searchFilter: {
        type: String
    },
    _status:{
        type     : Number,
        default  : 0
    }
}

let statics={

};
module.exports= {conf,statics}