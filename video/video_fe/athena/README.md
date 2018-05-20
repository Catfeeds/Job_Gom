# 基本设计思路

## restful api:
***
user
branch
group
projects
log

[登录参考文档](http://gitlab.intra.gomeplus.com/help/api/oauth2.md)



gitlab api:

通过query string 或 header 传递 private_token 

header -> PRIVATE-TOKEN

用户：

GITAUTH: "http://gitlab.intra.gomeplus.com/oauth/token"

 function gitLogin (req, res, username, pwd) {
    request.post(constants.GITAUTH,
        {
          form: {
            grant_type: 'password',
            username: username,
            password: pwd
          }
        },function (err,httpResponse,body){
          /*request.get("http://gitlab.intra.gomeplus.com/api/v3/projects?access_token="+JSON.parse(body).access_token, function(err,httpResponse,body){
            console.log(body)
          })*/
          console.log(body)
          try {
            var json = JSON.parse(body);
            if (json.error) {
              //console.log("我就是个错误...",body, json.error_description);
              var regFail = new RegExp("invalid_grant", "gim");
              console.log(json);
              if (regFail.test(json.error)) {
                req.flash('用户没有权限');
              }
              res.redirect('back');
            }else {
              saveLogin(req, null, username, pwd, {
                username: username,
                password: pwd,
                sysType: constants.GITLAB,
                access_token: json.access_token,
                auth: '--username' + username + ' --password ' + pwd + ' '
              });
              res.redirect('/');
            }
          }catch (e) {
            req.flash('请求出错,请重试');
            res.redirect('back');
          }
        }
    );
  }

