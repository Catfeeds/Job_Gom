## 简介

ThinkPHP 是一个免费开源的，快速、简单的面向对象的 轻量级PHP开发框架 ，创立于2006年初，遵循Apache2开源协议发布，是为了敏捷WEB应用开发和简化企业应用开发而诞生的。ThinkPHP从诞生以来一直秉承简洁实用的设计原则，在保持出色的性能和至简的代码的同时，也注重易用性。并且拥有众多的原创功能和特性，在社区团队的积极参与下，在易用性、扩展性和性能方面不断优化和改进，已经成长为国内最领先和最具影响力的WEB应用开发框架，众多的典型案例确保可以稳定用于商业以及门户级的开发。

## 全面的WEB开发特性支持

最新的ThinkPHP为WEB应用开发提供了强有力的支持，这些支持包括：

*  MVC支持-基于多层模型（M）、视图（V）、控制器（C）的设计模式
*  ORM支持-提供了全功能和高性能的ORM支持，支持大部分数据库
*  模板引擎支持-内置了高性能的基于标签库和XML标签的编译型模板引擎
*  RESTFul支持-通过REST控制器扩展提供了RESTFul支持，为你打造全新的URL设计和访问体验
*  云平台支持-提供了对新浪SAE平台和百度BAE平台的强力支持，具备“横跨性”和“平滑性”，支持本地化开发和调试以及部署切换，让你轻松过渡，打造全新的开发体验。
*  CLI支持-支持基于命令行的应用开发
*  RPC支持-提供包括PHPRpc、HProse、jsonRPC和Yar在内远程调用解决方案
*  MongoDb支持-提供NoSQL的支持
*  缓存支持-提供了包括文件、数据库、Memcache、Xcache、Redis等多种类型的缓存支持

## 大道至简的开发理念

ThinkPHP从诞生以来一直秉承大道至简的开发理念，无论从底层实现还是应用开发，我们都倡导用最少的代码完成相同的功能，正是由于对简单的执着和代码的修炼，让我们长期保持出色的性能和极速的开发体验。在主流PHP开发框架的评测数据中表现卓越，简单和快速开发是我们不变的宗旨。

## 安全性

框架在系统层面提供了众多的安全特性，确保你的网站和产品安全无忧。这些特性包括：

*  XSS安全防护
*  表单自动验证
*  强制数据类型转换
*  输入数据过滤
*  表单令牌验证
*  防SQL注入
*  图像上传检测

## 商业友好的开源协议

ThinkPHP遵循Apache2开源协议发布。Apache Licence是著名的非盈利开源组织Apache采用的协议。该协议和BSD类似，鼓励代码共享和尊重原作者的著作权，同样允许代码修改，再作为开源或商业软件发布。


##使用帮助
1.美信PC版模块分'Home','Mall','Ucenter','Group','Order','Passport'五部分组成
默认模块为Home模块，域名对应为：
主模块   Home		对应于 www.gomeplus.com
商城模块 Mall		对应于 mall.gomeplus.com
圈子模块 Group		对应于 group.gomeplus.com
订单模块 Order		对应于 order.gomeplus.com
账号模块 Passport	对应于 passport.gomeplus.com
以上模块都通过nginx配置进行重定向,配置实例见PC开发机10.69.205.41
/usr/local/nginx/conf/conf.d/liuchao.conf
2.模块对应的模型目录为Service，建议模块都放于Ucenter目录下，其它模块公用Home/Service
调用方法eg:D('Ucenter/Address')
namespace Ucenter\Controller;
use Home\Controller\AuthController;
class AddressController extends AuthController
{
	public function __construct()
	{
		parent::__construct();
		$this->address = D('Ucenter/Address');
	}
}
3.网站入口放到Home默认模块下BaseController.php和AuthController.php(登录权限验证)，其它模块根据需要进行继承
4.网站ajax模块，放置全站所有的ajax调用相关文件
5.View层注意事项
/Template/Front/控制器/视图.tpl
/Template/Front/Public/header.tpl
/Template/Front/Public/foot.tpl
每个模块可以个性化创建自己的header或foot，也可以继承其它模块的header和foot

