/**
 *
 Created by zhangzhao on 2017/6/4.
 Email: zhangzhao@gomeplus.com
 */
import cq from 'concurrent-queue';

let queue = cq().limit({
    concurrency: 5
}).process(function (task) {
    return new Promise(async (resolve, reject)=>{
        let result = await task['fun'].apply(null, task['args']);
        await resolve(result);
    })
});

export default queue;