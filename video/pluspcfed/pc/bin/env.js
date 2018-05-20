var program = require('commander');

program.allowUnknownOption()
    .option('--mx-dev', '调试开发环境')
    .option('--mx-pre', '调试仿真环境')
    .option('--mx-prd', '调试生产环境')
    .option('--mx-dist', '部署到测试环境')
    .option('--mx-build', '上线环境')
    .parse(process.argv);

var getParam = function(program) {
    var ents = {
        dev: {
            host: 'localhost',
            port: 1314,
            desc: '【调试开发环境】,请绑定: '
        },
        pre: {
            host: 'localhost',
            port: 80,
            desc: '【调试仿真环境】,请绑定: '
        },
        prd: {
            host: 'localhost',
            port: 443,
            desc: '【调试生产环境】,请绑定: '
        }
    };
    var ret;
    switch (true) {
        case program.mxDev:
            ret = ents.dev;
            ret.dev = true;
            break;
        case program.mxPre:
            ret = ents.pre;
            ret.pre = true;
            break;
        case program.mxPrd:
            ret = ents.prd;
            ret.prd = true;
            break;
        case program.mxDist:
            ret = {dist: true};
            break;
        case program.mxBuild:
            ret = {build: true};
            break;
        default:
            ret = ents.dev;
            ret.dev = true;
    }
    return ret;
};

var env = getParam(program);
env.debug = (env.dev || env.pre || env.prd) ? true : false;
env.online = (env.dist || env.build) ? true : false;
module.exports = env;
