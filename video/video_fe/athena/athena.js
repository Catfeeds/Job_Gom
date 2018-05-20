/**
 *
 Created by zhangzhao on 2017/7/4.
 Email: zhangzhao@gomeplus.com
 */
module.exports = {
    apps : [
        {
            name: "athena",
            script: "app.js",
            watch: true,
            env: {
                "NODE_ENV": "prod",
            }
        }
    ]
}