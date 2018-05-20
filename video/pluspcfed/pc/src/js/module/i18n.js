/**
 * Created by dongyukuan on 2016/7/4.
 */
var inputTip = {
    tel: {
        ept: '请填写11位手机号',
        err: '手机号格式错误',
        errBack: '该手机号已被注册'
    },
    msgCode: {
        tipGet: '请获取短信验证码',
        tipEpt: '请输入短信验证码',
        tipErr: '验证码是6位数字,请重新输入',
        tipErrEdit: '验证码错误',
        tipWrong: '验证码有误,请重新输入',
        checkCodeWrong: '验证码输入错误,请重新输入',
        send: '验证码已发送，请注意查收',
        tipSend: '验证码已发送您的手机，10分钟内输入有效',
        tipDisabled: "验证码再次获取需间隔60s",
        tipLimitEdit: '获取验证码超限，请稍后再试',
        btnAfterSend: "秒后重新获取",
        btnDefault: "获取验证码"
    },
    pwd: {
        commonTip: '请输入6-20位英文字母,数字或符号'
    },
    pwdV: {
        ept: '请再次输入密码',
        err: '两次输入的密码不一致'
    },
    nickName: {
        eptName: '请输入昵称！',
        commonTip: '昵称只能输入2-20位字符、字母、数字、-、_',
        existName: '此昵称太受欢迎了，已经有人抢了~',
        sucSub: '资料修改成功！',
        errLine: "网络超时!",
        wrongName: '此昵称含有敏感词,请重新输入'
    },
    birthTip: {
        tip: '生日不能重复设置'
    },
    refCode: {
        err: '推荐码错误'
    },
    imgCode: {
        ept: '请输入验证码',
        err: '验证码输入错误，请重新输入'
    },
    login: {
        errCode: '请输入验证码',
        errNum: '请输入账号',
        errPwd: '请输入密码',
        agreement: '请同意协议并勾选'
    },
    createCircle: {
        typeEmpty: '请选择圈子分类',
        nameEmpty: '圈子名称不能为空',
        upperLimit: '抱歉，您创建的圈子已经达到上限，暂不能创建！'
    },
    circle: {
    	login: '登录成功！',
        unJoin: '需要先加入该圈子才能发布话题',
        cannotJoin: '抱歉！该圈子不允许发布话题!',
        review: '加入圈子审核中，请耐心等待!',
        joinSuccess: '恭喜您已经加入圈子！',
        joinSuccessPublic: '恭喜您已经加入圈子，快来发布话题吧！',
        cannotJoinCircle: '抱歉！该圈子不允许任何人加入！',
        exit: '您已经退出该圈子！',
        dissolved: '抱歉！该圈子已被解散'
    },
    qrCodeTip: {
        loseEffTip: '二维码已失效',
        loseEffBtn: '点击刷新',
        failGetTip: '二维码生成失败',
        failGetBtn: '重新生成'
    },
    masterApply: {
        nameLength: '姓名要2-20个字符',
        nameType: '姓名仅限汉字和字母',
        isIdCard: '请填写18位有效身份证号',
        type: '请选择达人类别',
        summary: '请输入自我介绍，2-100个字符'
    },
    upload: {
        noUpload: '请上传图片',
        uploadError: '请上传小于2M的图片，支持格式jpg、jpeg、png、gif！',
        uploadFaild: '上传失败,请重新上传',
        uploadError_Master: '请上传小于2M的图片，支持格式jpg、jpeg、png、gif!',
        Q_EXCEED_NUM_LIMIT: '请上传小于2M的图片，支持格式jpg、jpeg、png、gif！',
        Q_EXCEED_SIZE_LIMIT: '总文件大小超出限制',
        Q_TYPE_DENIED: '文件类型错误',
        F_EXCEED_SIZE: '请上传jpg、png格式且小于2M的图片！',
        excess: '文件个数超出限制'
    },
    errLine: {
        tip: '网络错误,请稍后再试！'
    }
};
module.exports = inputTip;
