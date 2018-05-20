/**
 *
 Created by zhangzhao on 2017/5/24.
 Email: zhangzhao@gomeplus.com
 */
import mongoose from 'mongoose';
let conf={
    projectid: {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'project'
    },
    branchid: {
        type: Number
    },
    branchname : {
        type     : String,
        required: true
    },
    diskpath : {
        type     : String
    },
    groupid: {
        type     : Number
    },
    branchtype: {
        type: String
    },
    projecttype: {
        type: String
    },
    _status:{
        type     : Number,
        default  : 0
    },
    createdBy: {
        type: Number
    }
}

let statics={

};
module.exports= {conf,statics}