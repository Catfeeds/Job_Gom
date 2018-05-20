/**
 * Created by lishengyong on 2016/11/2.
 */
module.exports = {
    socketServer:'http://opg-pre.intra.gomeplus.com/',
    auth_token:'http://gitlab.intra.gomeplus.com/oauth/token',
    gitApiBasePath:'http://gitlab.intra.gomeplus.com/api/v3/',
    defaultGit: 'http://gitlab.intra.gomeplus.com/gomeplusFED/gomeplusUI.git',
    defaultGitID:'gomeplusFED/gomeplusUI',
    wsTitle:'OPG开发自动化平台',
    gomePlusUIIndex:'gomeplusUI/pc-platform/pug/index/index.html',
    errorPage:'error',
    update_content:[
        {id:1, value:"styles", content:"更新sass"},
        {id:2, value:"jade", content:"更新pug"},
        {id:3, value:"iamges", content:"更新图片"},
        {id:4, value:"js", content:"更新js"},
        {id:5, value:"default-clean", content:"清除缓存并全部更新"},
        {id:6, value:"default", content:"默认"}
    ]
}