/**
 * 项目启动时的配置信息,包括不同环境下的域名,端口等
 */
const env = (e) => {
    return {
        host: {

        },
        publicPath: {
            'dev': '123',
            'pre': 'pre',
            'production': 'production'
        },
        port: {
            
        }
    }
}

 module.exports = env;