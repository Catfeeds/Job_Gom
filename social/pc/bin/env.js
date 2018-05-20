var program = require('commander');

program.allowUnknownOption()
    .option('--mx-dev', '开发环境')
    .option('--mx-pre', '预生产环境')
    .option('--mx-prd', '生产环境')
    .parse(process.argv);

var getParam = function(program) {
    var ents = {
        dev: {
            host: 'http://js.dev.meixincdn.com',
            port: 8017,
            desc: '【开发环境】,请绑定: '
        },
        pre: {
            host: 'https://js-pre.meixincdn.com',
            port: 443,
            desc: '【预生产环境】,请绑定: '
        },
        prd: {
            host: 'https://js.meixincdn.com',
            port: 443,
            desc: '【生产环境】,请绑定: '
        }
    };
    var ret;
    switch (true) {
        case program.mxDev:
            ret = ents.dev;
            break;
        case program.mxPre:
            ret = ents.pre;
            break;
        case program.mxPrd:
            ret = ents.prd;
            break;
        default:
            ret = ents.dev;
    }
    var pathname = '/src/js/conf';
    ret.publicPath = ret.host + pathname;
    return ret;
};

var env = getParam(program);
console.log(env.desc + env.host);
module.exports = env;