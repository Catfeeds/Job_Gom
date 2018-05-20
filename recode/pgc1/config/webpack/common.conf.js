const paths = require('../paths');
const buildEnv = require('../buildEnv.json');

module.exports = function (port = 80) {
    return {
        assetsRoot: paths.dist,
        port: port,
        urls: {
            lcdev: 'http://localhost:' + port,
            lcvdev: 'http://localhost:' + port,
            dev: 'http://search.dev.video.api:' + port,
            pre: 'http://mp.pre.ds.gome.com.cn',
            production: ''
        },
        lcdev: 'http://localhost:' + port,
        lcvdev: 'http://localhost:' + port,
        // dev: 'http://js.dev.meixincdn.com',
        // pre: 'http://js.pre.meixincdn.com',
        dev: `http://js.dev.meixincdn.com:${port}`, //分支开发时,改新的地址,后续需要考虑flame本身的分支策略
        pre: 'http://js.pre.meixincdn.com',
        production: 'https://js.meixincdn.com',
        hosts: {
            dev: 'js.dev.meixincdn.com',
            pre: 'js.pre.meixincdn.com',
            production: 'js.meixincdn.com'
        },
        publicPath: {
            lcdev: "/",
            lcvdev: "/",
            // dev: `http://js.dev.meixincdn.com${buildEnv.cdnenv}dist`,
            dev: `http://js.dev.meixincdn.com/m/vpgc/dist`,
            pre: `http://js.pre.meixincdn.com${buildEnv.cdnenv}dist`,
            // pre: `http://js.pre.meixincdn.com/CDN8152/dist`,
            production: `https://js.meixincdn.com/m/vpgc/dist`
        }
    }
};
