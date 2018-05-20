/* css */
import 'css/page/register/index.scss';
import 'css/page/login/index.scss';
import {
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import React, {Component} from 'react';
import Validator from 'util/Validator.js';
import fetch from 'io/fetch.js';
import Dialog from 'components/Dialog';
import ReactDOM from 'react-dom';
import {isObject} from 'util/tools.js';

import { setCookie } from 'util/cookie.js';


//showModal(<Toast visible={true} msg="删除成功"/>);

const showModal=(App, delay)=>{
    setTimeout(()=>{
        ReactDOM.render(App,
            document.getElementById('vm-dialog'));
    }, delay || 0);
}

let states = true;  //验证状态
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userMsg:'',
            userError:false,
            userMessge:this.props.userMeesge,
            passWord: '',
            passMsg:'',
            passError:false,
            tel: '',
            telMsg:'',
            telError:false,
            code: '',
            codeMsg:'',
            codeError:false,
            count:60,
            liked:false,
            noCode:false,
            hasUser:false,
            hasTel:false
        };
    }
    callBackMsg(msgBox){
        if(msgBox.username !=""){
            this.changeMsg(true,"user",msgBox.username);
        }
        if(msgBox.password !=""){
            this.changeMsg(true,"pass",msgBox.password);
        }
        if(msgBox.mobile !=""){
            this.changeMsg(true,"tel",msgBox.mobile);
        }
        if(msgBox.smscode !=""){
            this.changeMsg(true,"code",msgBox.smscode);
        }
        if(!isObject(msgBox)){
            this.changeMsg(true,"code",msgBox);
        }
    }
    enterClick(event){
        if(event.keyCode==13) {
            this.handleClick();
        }
    }
    changeMsg(show,errorBox,errorText){
        switch(errorBox){
            case "user":
                this.setState({
                    userMsg: errorText,
                    userError: show
                });
            break;
            case "pass":
                this.setState({
                    passMsg: errorText,
                    passError: show
                });
            break;
            case "tel":
                this.setState({
                    telMsg: errorText,
                    telError: show
                });
            break;
            case "code":
                this.setState({
                    codeMsg: errorText,
                    codeError: show
                });
            break;
        }
    }
    showDialog(){
        showModal(
            <Dialog
                visible={true}
                title="国美内容创作平台服务协议"
                style={
                    {
                        width: 900
                    }
                }
            >{<div className="register-rules"><p>【首部及导言】</p>
            <p>&nbsp;</p>
<p>欢迎您使用国美内容创作平台！</p>
<p>
为使用国美内容创作平台服务（以下简称“本服务”），您应当阅读并遵守《国美内容创作平台服务协议》（以下简称“本协议”）以及与此相关的专项规则等。</p>
<p>
请您务必审慎阅读、充分理解各条款内容，特别是免除或限制责任的条款，以及开通或使用某项服务的单独协议或特别条款，并选择接受或不接受。限制、免责条款可能以加粗形式提示您注意。</p>
<p>
除非您已阅读并接受本协议所有条款，否则您无权使用国美内容创作平台服务。您对本服务的登录、查看、发布信息等行为即视为您已阅读并同意接受本协议的约束。您有违反本协议的任何行为时，国美有权依照违反情况，随时单方限制、中止或终止向您提供本服务，并有权追究您的相关责任。</p>
<p>
如果您未满18周岁，请在法定监护人的陪同下阅读本协议及其他上述协议条款，并特别注意未成年人使用条款。
</p>
<p>&nbsp;</p>
<p>一、【协议的范围】</p>
<p>1.1  本协议是您与国美之间关于您使用国美内容创作平台服务所订立的协议。“国美”是指美信网络技术有限公司及其相关服务可能存在的运营关联单位。“用户”是指注册、登录、使用国美内容创作平台的个人或组织，在本协议中更多地称为“您”。“其他用户”是指包括除您以外的其他国美内容创作平台用户、国美平台用户、国美内容创作平台服务相关的用户。“国美平台用户”是指注册成为“国美gome.com.cn”的会员用户。</p>
<p>1.2  本协议内容同时包括国美可能不断发布的关于本服务的相关协议、服务声明、业务规则及公告指引等内容（以下统称为“专项规则”）。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。</p>
<p>&nbsp;</p>
<p>二、【帐号注册与认证】</p>
<p>2.1  您在使用本服务前需要注册一个国美内容创作平台帐号。国美内容创作平台帐号通过手机号进行绑定注册。国美有权根据用户需求和产品需要对帐号注册和绑定的方式进行变更，关于您使用帐号的具体规则，请遵守相关帐号使用协议以及国美为此发布的专项规则。</p>
<p>2.2 您在注册国美内容创作平台帐号时需要选择帐号类型，且选择后将无法更改。您可以按照国美内容创作平台的要求对账号内容进行设置。</p>
<p>2.3 您基于信息登记或其他需要可以为国美内容创作平台帐号申请国美内容创作平台认证。认证审核包括帐号资质审核与帐号名称审核。完成所有审核流程后，由国美作出认证成功的判断。国美内容创作平台认证服务内容仅限于对您提交的资料及信息进行甄别与核实，国美将对您提交的资料和信息进行合理、谨慎的形式审查，但在国美的合法权限和合理能力范围内，国美无法实质审查您的实际经营、运营、提供服务以及推广等行为，并不为此提供任何担保。因您的行为导致与其他用户或第三方发生争议的，由您独立对外承担责任，因此给国美、其他用户或第三方造成损害的，您应当依法予以赔偿。</p>
<p>为向您提供更专业的服务，您同意授权国美可以委托第三方对您所提交的注册资料、认证资料等信息登记资料进行核查、校验和审核，也可能会在法律允许和审核需要的范围内对您提交的资料、信息及相关背景信息、关联信息进行查询，并根据审核情况进行独立判断后确定认证结果，以实现国美内容创作平台帐号注册和认证。同时，为依法保护相关权利人的在先权利并规范平台运营，部分国美内容创作平台帐号需要认证才能注册和使用。</p>
<p>2.4  国美内容创作平台帐号注册采用实名制，您应当如实填写和提交帐号注册与认证资料，完成信息登记，并对资料的真实性、合法性、准确性和有效性承担责任。国美依据您填写和提交的帐号资料，在法律允许的范围内向其他用户展示您的注册信息。如您提供的服务或内容需要取得相关法律法规规定的许可、进行备案或取得相关合法资质的，您应当在帐号注册与认证时进行明确说明并提交相应的许可、备案或资质证明。否则，国美有权拒绝或中止、终止提供本服务，并依照本协议对违规帐号进行处罚。因此给国美或第三方造成损害的，您应当依法予以赔偿。</p>
<p>&nbsp;</p>
<p>三、【用户个人信息保护】</p>
<p>3.1  保护您的个人信息是国美的一项基本原则，国美将会采取合理的措施保护您的个人信息。除法律法规规定的情形外，未经您的许可国美不会向第三方公开、透露您的个人信息。国美对相关信息采用专业加密存储与传输方式，保障用户个人信息的安全。</p>
<p>3.2  您在申请本服务过程中，需要填写一些必要的信息，请保持这些信息的真实、准确、合法、有效并注意及时更新，以便国美向您提供及时有效的帮助，或更好地为您提供服务。根据相关法律法规和政策，请您填写真实的身份信息。若您填写的信息不完整或不准确，则可能无法使用本服务或在使用过程中受到限制。</p>
<p>3.3  一般情况下，您可随时浏览、修改自己提交的信息，但出于安全性和身份识别（如帐号申诉服务）的考虑，您可能无法修改注册时提供的初始注册信息及其他验证信息。</p>
<p>3.4  国美将运用各种安全技术和程序建立完善的管理制度来保护您的个人信息，以免遭受未经授权的访问、使用或披露。</p>
<p>3.5  未经您的同意，国美不会向国美以外的任何公司、组织和个人披露您的个人信息，但法律法规另有规定的除外。</p>
<p>3.6  国美非常重视对未成年人个人信息的保护。若您是18周岁以下的未成年人，在使用国美的服务前，应事先取得您家长或法定监护人的书面同意。</p>
<p>3.7  您应对通过本服务了解、接收或可接触到的包括但不限于其他用户在内的任何人的个人信息予以充分尊重，您不应以搜集、复制、存储、传播或以其他任何方式使用其他用户的个人信息，否则，由此产生的后果由您自行承担。</p>
<p>&nbsp;</p>
<p>四、【用户行为规范】</p>
<p>4.1 【信息内容规范】</p>
<p> 4.1.1 本协议所述信息内容是指您在使用本服务过程中所制作、复制、发布、传播的任何内容，包括但不限于国美内容创作平台帐号头像、名称等注册信息及认证资料，或文字、语音、图片、视频、图文等发送、回复或自动回复消息和相关链接页面，以及其他使用国美内容创作平台帐号或国美内容创作平台服务所产生的内容，也称“国美内容创作平台信息内容”。</p>
<p>4.1.2 您理解并同意，国美内容创作平台一直致力于为用户提供文明健康、规范有序的网络环境，您不得利用国美内容创作平台帐号或国美内容创作平台服务制作、复制、发布、传播如下干扰国美内容创作平台正常运营，以及侵犯其他用户或第三方合法权益的内容：</p>
<p> 4.1.2.1 发布、传送、传播、储存违反国家法律法规禁止的内容：</p>
<p>（1）违反宪法确定的基本原则的；</p>
<p>（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
<p>（1）违反宪法确定的基本原则的；</p>
<p>
  （2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
<p>
  （3）损害国家荣誉和利益的；</p>
<p>
  （4）煽动民族仇恨、民族歧视，破坏民族团结的；</p>
<p>
  （5）破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
<p>
  （6）散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
<p>
  （7）散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</p>
<p>
  （8）侮辱或者诽谤他人，侵害他人合法权益的；</p>
<p>
  （9）煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；</p>
<p>
  （10）以非法民间组织名义活动的；</p>
<p>
  （11）不符合《即时通信工具公众信息服务发展管理暂行规定》及遵守法律法规、社会主义制度、国家利益、公民合法利益、公共秩序、社会道德风尚和信息真实性等“七条底线”要求的；</p>
<p>
 （12）含有法律、行政法规禁止的其他内容的。
</p>
<p>4.1.2.2 发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；</p>
<p>4.1.2.3 涉及他人隐私、个人信息或资料的内容；</p>
<p>4.1.2.4 发表、传送、传播骚扰信息、广告信息及垃圾信息或含有任何性或性暗示的内容；</p>
<p>4.1.2.5 发布、传送、传播谣言、虚假信息或其他含有不实信息的内容；</p>
<p>4.1.2.6 其他违反法律法规、政策及公序良俗、社会公德或干扰国美内容创作平台正常运营和侵犯其他用户或第三方合法权益内容的信息。</p>
<p>&nbsp;</p>
<p>4.2 【平台使用规范】</p>
<p>
 4.2.1 本条所述平台使用是指您在使用本服务所进行的任何行为，包括但不限于注册登录、申请认证、帐号运营推广以及其他使用国美内容创作平台帐号或国美内容创作平台服务所进行的行为。</p>
<p>
 4.2.2 您不得利用国美内容创作平台帐号或国美内容创作平台服务进行如下行为：</p>
<p>
  4.2.2.1 提交、发布虚假信息；</p>
<p>
  4.2.2.2 强制、诱导其他用户关注帐号、点击链接页面或分享信息的；</p>
<p>
  4.2.2.3 虚构事实、隐瞒真相以误导、欺骗他人的；</p>
<p>
  4.2.2.4 侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；</p>
<p>
  4.2.2.5 填写和提交帐号注册与认证资料违反本协议规定，或申请认证资料与注册信息内容不一致，以及运营行为与注册或认证信息所公示身份无关的；</p>
<p>
  4.2.2.6 未能按照国美内容创作平台业务流程注册和使用本服务，违反本服务功能限制或运营策略，或采取任何措施规避前述流程、限制或策略，干扰国美内容创作平台正常运营的；</p>
<p>
  4.2.2.7 未经国美书面许可利用其他国美内容创作平台帐号、国美平台帐号和任何功能，以及第三方运营平台进行推广或互相推广的；</p>
<p>
  4.2.2.8 未经国美书面许可使用插件、外挂或通过其他第三方工具、运营平台或任何服务接入本服务和相关系统的；</p>
<p>
  4.2.2.9 利用国美内容创作平台帐号或国美内容创作平台服务从事包括但不限于欺诈、传销、违法物品营销等任何违法犯罪活动的；</p>
<p>
  4.2.2.10 制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的；</p>
<p>
 4.2.2.11 仿冒、混淆他人帐号昵称、头像、功能介绍或发布内容等，或冒充、利用他人名义的；</p>
<p>
 4.2.2.12 未经国美书面许可，自行或授权、允许、协助任何第三人对信息内容进行非法获取，用于包括但不限于宣传、增加阅读量、浏览量等商业用途的。“非法获取”是指采用包括但不限于“蜘蛛”(spider)程序、爬虫程序、拟人程序等非真实用户或避开、破坏技术措施等非正常浏览的手段、方式，读取、复制、转存、获得数据和信息内容的行为；</p>
<p>
 4.2.2.13 未经国美书面许可，与第三方达成任何形式的协议、承诺或确认，在国美内容创作平台发布任何对本服务所提供的任何功能进行排他、排斥、排除、妨碍、阻碍、强制选择等非善意竞争的内容；</p>
<p>
 4.2.2.14 任何导致或可能导致国美与第三方产生纠纷、争议或诉讼的行为。</p>
<p>
4.2.3 您在使用本服务的过程中，不得从事包括但不限于以下行为，也不得为以下行为提供便利（包括但不限于为用户的行为提供便利等）：</p>
<p>
 4.2.3.1删除、隐匿、改变本服务显示或其中包含的任何专利、著作权、商标或其他权利声明；</p>
<p>
 4.2.3.2以任何方式干扰或企图干扰国美任何产品、任何部分或功能的正常运行，或者制作、发布、传播上述工具、方法等；</p>
<p>
 4.2.3.3 除无法绕开的内容显示需要外，未经国美书面许可，不得以国美名义使用任何国美商标标识或其任何变体、缩写、改写等；</p>
<p>
 4.2.3.4 避开、尝试避开或声称能够避开任何内容保护机制，或导致用户认为其直接与国美及国美相关产品进行交互；</p>
<p>
 4.2.3.5 除无法绕开的信息内容显示需要外，在未获得国美书面许可的情况下，以任何方式使用国美URL地址、技术接口等；</p>
<p>
 4.2.3.6 在未经过用户同意的情况下，向任何其他用户及他方显示或以其他任何方式提供该用户的任何信息；</p>
<p>
 4.2.3.7 在没有获得用户和国美明示同意的情况下，擅自以国美的名义向用户发布、发送商业广告等信息；</p>
<p>
 4.2.3.8 为任何用户自动登录到本服务平台提供代理身份验证凭据；</p>
<p>
 4.2.3.9 提供跟踪功能，包括但不限于识别其他用户在个人主页上查看、点击等操作行为；</p>
<p>
 4.2.3.10 自动将浏览器窗口定向到其他网页；</p>
<p>
 4.2.3.11 未经授权获取对国美产品或服务的访问权；</p>
<p>
 4.2.3.12 发布的信息内容中含有计算机病毒、木马或者其他恶意程序、链接等任何可能危害国美或用户权益和终端信息安全等的内容；</p>
<p>
 4.2.3.13 捏造或虚构事实，或未经国美书面同意，公开表达或暗示，您与国美之间存在合作关系，包括但不限于相互持股、商业往来或合作关系等，或声称国美对您的认可；</p>
<p>
 4.2.3.14 其他国美认为不应该、不适当的行为、内容。</p>
<p>&nbsp;</p>
<p>4.3【对自己行为负责】</p>
<p>您理解并同意，国美内容创作平台仅为您提供信息分享、传播及获取的平台，您必须为自己注册帐号下的一切行为负责，包括您所发表的任何内容以及由此产生的任何后果。您应对本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。国美无法且不会对因前述风险而导致的任何损失或损害承担责任。 </p>
<p>&nbsp;</p>
<p>五、【帐号管理】</p>
<p>5.1 国美内容创作平台帐号的所有权归国美公司所有，您完成申请注册手续后，获得国美内容创作平台帐号的使用权，该使用权仅属于初始申请注册主体。若进行国美内容创作平台实名认证时，该国美内容创作平台帐号在帐号资质审核阶段提交的用户信息与初始申请注册主体不一致的，帐号资质审核成功之后使用权属于通过资质审核的用户。帐号使用权禁止赠与、借用、租用、转让或售卖。</p>
<p>
5.2 国美内容创作平台帐号密码由您自行设定。国美特别提醒您应妥善保管您的帐号和密码。国美与您共同负有维护帐号安全的责任。国美会采取并不断更新技术措施，努力保护您的帐号在服务器端的安全。您需要采取特定措施保护您的帐号安全，包括但不限于妥善保管国美内容创作平台帐号与密码、安装防病毒木马软件、定期更改密码等措施。当您使用完毕后，应安全退出。您同意在任何情况下不向他人透露帐号或密码信息。因您保管不善可能导致帐号被他人使用（包括但不限于遭受盗号、密码失窃）或信息数据泄漏，责任由您自行承担。您理解并同意，在您未进行投诉或提出帐号申诉等方式明确告知国美帐号被他人使用或信息数据泄漏等情况并提供相关证明材料前，国美有理由相信该帐号行为是您使用帐号的行为。</p>
<p>
5.3 在您怀疑他人在使用您的帐号或密码时，您同意立即通知国美公司。如果您当前使用的国美内容创作平台帐号并不是您初始申请注册的或者通过国美提供的其他途径获得的，但您却知悉该帐号当前的密码，您不得用该帐号登录或进行任何操作，并请您在第一时间通知国美或者该帐号的初始申请注册主体。如果国美发现您并非该帐号初始申请注册主体，国美有权在未经通知的情况下终止您使用该帐号。</p>
<p>
5.4 您理解并同意，为保护您及其他用户的数据安全，防止用户信息泄露、毁损、篡改或者丢失，国美有权对您接入的信息系统实行接入审查，包括但不限于技术水平审查、安全水平审查、主体资质审查等，并根据审查结果向您提出防入侵、防病毒等措施建议。若您的信息系统仍无法符合保护用户数据安全的要求，国美有权拒绝或终止提供本服务。</p>
<p>
5.5 如您违反相关法律法规、本协议以及专项规则的规定，国美有权进行独立判断并随时限制、冻结或终止您对国美内容创作平台帐号的使用，且根据实际情况决定是否恢复使用。由此给您带来的损失（包括但不限于通信中断，用户资料及相关数据清空等），由您自行承担。</p>
<p>
5.6 如果您的国美内容创作平台帐号被盗、密码遗忘或因其他原因导致无法正常登录，您可以按照国美的申诉途径进行申诉。国美并不承诺您一定能通过申诉找回帐号。 </p>
<p>
5.7 为了充分利用帐号资源，如果您存在长期未完成注册、注册国美内容创作平台帐号后未及时进行初次登录使用，或长期未登陆使用国美内容创作平台帐号等情形，国美有权终止该帐号的使用。
</p>
<p>&nbsp;</p>
<p>六、【数据的储存和使用规则】</p>
<p>6.1 国美不对您在本服务中相关数据的删除或储存失败负责。</p>
<p>6.2 国美有权根据实际情况自行决定单个用户在本服务中数据的最长储存期限，并在服务器上为其分配数据最大存储空间等。您可根据自己的需要自行备份本服务中的相关数据。</p>
<p>6.3 如果您停止使用本服务或服务被终止或取消，国美可以从服务器上永久地删除您的数据。在服务停止、终止或取消后，国美没有义务向您返还任何数据。</p>
<p>&nbsp;</p>
<p>七、【风险及免责】</p>
<p>7.1  您理解并同意：为了向您提供有效的服务，本服务会利用您终端设备的处理器和带宽等资源。本服务使用过程中可能产生数据流量的费用，用户需自行向运营商了解相关资费信息，并自行承担相关费用。</p>
<p>
7.2  您理解并同意：在使用本服务时，须自行承担如下国美不可掌控的风险内容，包括但不限于：</p>
<p>
 7.2.1 由于受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏等不可抗拒因素可能引起的信息丢失、泄漏等损失和风险；</p>
<p>
 7.2.2 您或国美的电脑软件、系统、硬件和通信线路出现故障导致的服务终端、数据丢失以及其他的损失和风险；</p>
<p>
 7.2.3 您操作不当或通过非国美授权的方式使用本服务带来的损失和风险；</p>
<p>
 7.2.4 您发布的内容被他人转发、分享，因此等传播可能带来的风险和责任；</p>
<p>
 7.2.5 由于网络信号不稳定等原因，所引起的国美内容创作平台登录失败、资料同步不完整、页面打开速度慢等风险；</p>
<p>
 7.2.6 其他国美无法控制或合理预见的情形。</p>
<p>
7.3  您理解并同意，您通过国美内容创作平台群发的内容可能会被其他用户或第三方复制、转载、修改或做其他用途，脱离您的预期和控制，您应充分意识到此类风险的存在，任何您不愿被他人获知的信息都不应在国美内容创作平台发布。如果相关行为侵犯了您的合法权益，您可以向国美内容创作平台投诉，我们将依法进行处理。</p>
<p>
7.4  国美依据本协议约定获得处理违法违规内容或行为的权利，该权利不构成国美的义务或承诺，国美不能保证及时发现违法违规情形或进行相应处理。</p>
<p>
7.5  您理解并同意，因业务发展需要，国美保留单方面对本服务的全部或部分服务内容在任何时候不经任何通知的情况下变更、暂停、限制、终止或撤销的权利，您需承担此风险。</p>
<p>
7.6  国美会根据您选择的服务类型向您提供相应的服务。您理解并同意，基于用户体验、国美或其服务平台运营安全、平台规则要求及健康发展等综合因素，国美有权选择提供服务或开展合作的对象，有权决定功能开放、数据接口和相关数据披露的对象和范围，并有权视具体情况中止或终止向存有包括但不限于以下情形的用户提供本服务：</p>
<p>
（1）违反法律法规或本协议规定的；</p>
<p>
（2）影响使用者体验的；</p>
<p>
（3）存在安全隐患的；</p>
<p>
（4）与国美或其服务平台已有主要功能或功能组件相似、相同，或可实现上述功能或功能组件的主要效用的；</p>
<p>
（5）界面、风格、功能、描述或使用者体验与国美或其服务平台类似，可能造成国美用户认为其所使用的功能或服务来源于国美或经国美授权的；</p>
<p>
（6）违背国美或其服务平台运营原则，或不符合国美其他管理要求的。</p>
<p>
7.7  您理解并同意：在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、风暴等以及社会事件如战争、动乱、政府行为等。
</p>
<p>&nbsp;</p>
<p>八、【知识产权声明】</p>
<p>8.1  您了解并同意您通过国美内容创作平台发布的作品在国美平台（gome.com.cn）及客户端，以及其他与国美存在合作关系的第三方平台上进行推广、展示以及使用，国美有可能根据实际需要对您的作品重新编辑或加工（包括但不限于在作品页面添加商品、广告链接等），但不会改变作品原意。国美有权决定推广的内容及展示方式，您无需向国美支付任何费用，国美或第三方平台也无需向您支付任何酬劳。如您同意并授权国美使用您在国美内容创作平台的作品，您需在发布页面进行勾选。一旦您勾选“同意”，意味着永久授权国美使用您在国美内容创作平台的所有作品，国美在使用您的作品前将不再与您单独确认，且该授权不可撤销。</p>
<p>
8.2  国美内容创作平台是一个为您提供获取、分享及传播信息的平台，为向所有用户提供更优质的服务，国美可能会对国美内容创作平台帐号的昵称、头像、认证信息、公开群发信息等公开非保密内容在法律允许的范围内进行使用，包括但不限于提供搜索、链接等服务。</p>
<p>
8.3  除另有特别声明外，国美提供本服务时所依托软件的著作权、专利权及其他知识产权均归国美所有。</p>
<p>
8.4  国美在本服务中所使用的“GOME”、“国美互联网”、“国美”、国美图标及LOGO等商业标识，其著作权或商标权归国美所有。未经国美书面授权，您不得为任何目的和形式使用国美及其关联公司的商标、标志及企业名称、字号，否则，您应承担由此引致的全部法律责任。 </p>
<p>
8.5  上述及其他任何本服务包含的内容的知识产权均受到法律保护，其他未经国美、用户或相关权利人许可的第三人，不得以任何形式进行使用或创造相关衍生作品。</p>
<p>
8.6  您理解并同意，您向任何第三人分享、转发、复制国美内容创作平台信息内容的行为，均应遵守国美内容创作平台为此制定的规范和标准，包括但不限于展示方式应为该信息或内容的原链接、确保附属于该信息或内容的功能可正常使用等。</p>
<p>
8.7  任何未经国美书面同意及权利人许可的非法获取行为，均属违法侵权行为。您确认并同意，为及时、有效地保障您基于本服务的合法权益，您授权国美在发现您的合法权益（包括但不限于信息网络传播权、著作权等）可能受到侵害时，有权代为向涉嫌侵权的第三人采取法律手段进行维权，授权采取的法律手段包括但不限于发函警告、提起诉讼、申请仲裁、移送侦查机关处理等。
</p>
<p>&nbsp;</p>
<p>九、【法律责任】</p>
<p>9.1  如果国美发现或收到他人投诉您违反本协议约定的，国美有权不经通知随时对相关内容进行删除、屏蔽，并视行为情节对违规帐号处以包括但不限于警告、限制或禁止使用部分或全部功能、帐号封禁直至注销的处罚，并公告处理结果。国美也有权依照本协议及专项规则的规定，拒绝再向您提供服务。国美内容创作平台认证帐号除上述处罚措施外，国美有权取消其帐号认证身份，并视情节决定临时或永久封禁相关帐号认证资质。如果您发现任何人违反本协议规定或以其他不当的方式使用国美内容创作平台服务，请立即向国美内容创作平台投诉，我们将依法进行处理。</p>
<p>
9.2  您理解并同意，国美有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何人士采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，您应独自承担由此而产生的一切法律责任。</p>
<p>
9.3  您理解并同意，因您违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，您应当独立承担责任；国美因此遭受损失的，您也应当一并赔偿。</p>
<p>
9.4  您理解并同意，为及时保障用户合法权益不受侵害，若您的国美内容创作平台帐号存在权益纠纷，国美有权根据情况，采取包括但不限于暂停、冻结该国美内容创作平台帐号的部分或全部功能等保护措施，直至有权机关作出生效裁判或用户在不违反本协议的前提下协商一致，并由此所产生的一切法律责任均与国美无关。
</p>
<p>&nbsp;</p>
<p>十、【通知】</p>
<p>10.1  您使用本服务即视为您已阅读并同意受本协议的约束。国美有权在必要时修改本协议条款。国美可能会以包括但不限于在相关服务页面展示、网页公告、网页提示、电子邮箱、手机短信、常规的信件传送、您注册使用本服务的帐号管理系统内发送站内信等方式中的一种或多种，向您送达关于本服务的各种规则、通知、提示等信息，您可以在相关服务页面查阅最新版本的条款。本协议条款变更后，如果您继续使用国美内容创作平台服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用国美内容创作平台服务。</p>
<p>10.2  您同意，任何由于电子邮箱、手机号码、通讯地址等信息错误或其他不可归咎于国美的原因，导致您未收到相关规则、通知、提示等信息的，均不影响该等信息对您所产生的法律效力，并您应受其约束，由此产生的一切后果及责任由您自行承担。</p>
<p>10.3 您清楚知悉并同意，若您有任何事项需要通知国美的，均应当按照本服务对外正式公布的联系方式或渠道系统进行提交，否则，国美将无法收到您的通知。</p>
<p>&nbsp;</p>
<p>十一、【其它】</p>
<p>11.1  您使用本服务即视为您已阅读并同意接受本协议的约束。国美有权在必要时修改本协议条款。您可以在相关服务页面查阅最新版本的条款。本协议条款变更后，如果您继续使用国美内容创作平台服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用国美内容创作平台服务。</p>
<p>11.2  本协议签订地为中华人民共和国北京市朝阳区。若您和国美之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地人民法院管辖。</p>
<p>
11.3  本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律。</p>
<p>
11.4  本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>
<p>
11.5  本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</p></div>}
</Dialog>
        )
    }
    handleFocus(event){
        let inputname = event.target.name;
        if(inputname == "userName"){
            this.setState({
                userMessge: true
            });
        }else{
            this.setState({
                userMessge: false
            });
        }
    }
    handleBlur(event) {
        const inputname = event.target.name;
        
        let name = this.state.userName;
        let pass = this.state.passWord;
        let tel = this.state.tel;
        let code = this.state.code;
        
        switch(inputname){
            case "userName":
                if(name == ""){
//                  this.setState({
//                      userMessge: false
//                  });
                    this.changeMsg(false,"user","");
                }else if(Validator(name, 'number') || Validator(name, 'symbol') ||!Validator(name,"account")){
//                  this.setState({
//                      userMessge: true
//                  });
                    this.changeMsg(true,"user","输入信息不符合上述规则");
                }else if(Validator(name,"account")){
                    fetch.get('account/checkAccount',{params:{username:name}})
                    .then((res)=>{
                        let data = res.data;
                        if (data.code == 0) {
                            if(data.data.is_register == 1){
                                this.changeMsg(true,"user","该账号已存在，去<a href='/'>登录</a>");
                                this.setState({
                                    hasUser: true,
//                                  userMessge: false
                                });
                            }else{
                                this.changeMsg(false,"user","");
                                this.setState({
                                    hasUser: false,
//                                  userMessge: false
                                });
                            }
                        }else{
                            this.changeMsg(false,"user","");
                            this.setState({
                                hasUser: false,
//                              userMessge: false
                            });
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
                }else{
                    this.setState({
//                      userMessge: false
                    });
                    this.changeMsg(false,"user","");
                    states = true;
                }
            break;
            case "tel":
                if(tel == ""){
                    this.changeMsg(false,"tel","");
                }else if(!Validator(tel,"tel")){
                    this.changeMsg(true,"tel","请输入正确的手机号");
                }else if(Validator(tel,"tel")){
                    fetch.get('account/checkMobile',{params:{mobile:tel}})
                    .then((res)=>{
                        let data = res.data;
                        if (data.code == 0) {
                            if(data.data.is_register == 1){
                                this.changeMsg(true,"tel","该手机号已注册，去<a href='/'>登录</a>");
                                this.setState({
                                    hasTel: true,
                                    noCode: true
                                });
                            }else{
                                this.changeMsg(false,"tel","");
                                this.setState({
                                    hasTel: false,
                                    noCode: false
                                });
                            }
                        }else{
                            this.changeMsg(false,"tel","");
                            this.setState({
                                hasTel: false,
                                noCode: false
                            });
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
                }else{
                    this.changeMsg(false,"tel","");
                    states = true;
                }
            break;
            case "passWord":
                if(pass==""){
                    this.changeMsg(false,"pass","");
                }else if(!Validator(pass,"password")){
                    this.changeMsg(true,"pass","请输入6-20个字母、数字或符号");
                }else{
                    this.changeMsg(false,"pass","");
                }
            break;
        }
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    handleClickCode(event){
        let val = this.state.tel;
        let tel = this.state.tel;
        let code = this.state.code;
        //手机验证
        if(val==""){
            this.changeMsg(true,"tel","请输入手机号");
        }else if(!Validator(val,"tel")){
            this.changeMsg(true,"tel","手机号出错");
        }else{
            fetch.get('account/checkMobile',{params:{mobile:tel}})
            .then((res)=>{
                let data = res.data;
                if (data.code == 0) {
                    if(data.data.is_register == 1){
                        this.changeMsg(true,"tel","该手机号已注册，去<a href='/'>登录</a>");
                        this.setState({
                            hasTel: true,
                            noCode: true
                        });
                    }else{
                        this.changeMsg(false,"tel","");
                        this.setState({
                            hasTel: false,
                            noCode: false
                        });
                    }
                }else{
                    this.changeMsg(false,"tel","");
                    this.setState({
                        hasTel: false,
                        noCode: false
                    });
                    fetch.get('account/getSmsRegister',{params:{mobile:val}})
                    .then((res)=>{
                        let data = res.data;
                        if (data.code == 1) {
                            this.timer = setInterval(function () {
                                var count = this.state.count;
                                this.setState({
                                    liked: true
                                });
                                count -= 1;
                                if (count < 1) {
                                    this.setState({
                                        liked: false
                                    });
                                    count = 60;
                                    clearInterval(this.timer);
                                }
                                this.setState({
                                    count: count
                                });
                            }.bind(this), 1000);
                        }else{
                            this.callBackMsg(data.message);
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            });
            
            
        }
    }
    handleClick(event) {
        let name = this.state.userName;
        let pass = this.state.passWord;
        let tel = this.state.tel;
        let code = this.state.code;
        
        
        
        
        //用户名验证
        if(name==""){
            this.setState({
                userMessge: true
            });
            this.changeMsg(true,"user","请输入账号");
            states = false;
            return;
        }else if(Validator(name, 'number') || Validator(name, 'symbol') || !Validator(name,"account")){
            this.setState({
                userMessge: true
            });
            this.changeMsg(true,"user","输入信息不符合上述规则");
            states = false;
            return;
        }else{
            this.setState({
                userMessge: false
            });
            this.changeMsg(false,"user","");
            states = true;
        }
        
        //密码验证
        if(pass==""){
            this.changeMsg(true,"pass","请输入密码");
            states = false;
            return;
        }else if(!Validator(pass,"password")){
            this.changeMsg(true,"pass","请输入6-20个字母、数字或符号");
            states = false;
            return;
        }else{
            this.changeMsg(false,"pass","");
            states = true;
        }
        
        //手机验证
        if(tel==""){
            this.changeMsg(true,"tel","请输入手机号");
            states = false;
            return;
        }else if(!Validator(tel,"tel")){
            this.changeMsg(true,"tel","请输入正确的手机号");
            states = false;
            return;
        }else{
            this.changeMsg(false,"tel","");
            states = true;
        }
        
        //验证码非空验证
        if(code==""){
            this.changeMsg(true,"code","请输入验证码");
            states = false;
            return;
        }else{
            this.changeMsg(false,"code","");
            states = true;
        }
        
        if(states){
            //ajax请求
            fetch.post('account/register',
            {
                username:name,
                password:pass,
                mobile:tel,
                smscode:code
            })
            .then((res)=>{
                let data = res.data;
                if (data.code == 1) {
                    let userInfo = data.data;
                    setCookie('accountId', userInfo.account_id);
                    setCookie('username', userInfo.username);
                    window.location.href = "/portal";
                }else{
                    this.callBackMsg(data.message);
                }
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    }
    componentWillReceiveProps(){
        this.setState({
            userMessge:this.props.userMeesge,
        });
    }
    render() {
        let text = this.state.liked ? this.state.count + '秒后重发' : '发送验证码';
        let cname = this.state.liked ? 'btn disable' : 'btn ';
        
        let noBtn = false;
        let disable = false;
        
        if(this.state.hasUser || this.state.hasTel){
            noBtn = true;
        }else{
            noBtn = false;
        }
        
        if(this.state.liked || this.state.noCode){
            disable = true;
        }else{
            disable = false;
        }
        
        
        return (
            <div>
                <div className="login-wrap">
                    <div className="login-box">
                        <div className="login-form">
                            <div className="form-group">
                                <div className="form-input">
                                    <em className="icon-8"></em>
                                    <input
                                        className="input-text"
                                        name="userName"
                                        type="text"
                                        placeholder="账号"
                                        value={this.state.userName}
                                        onFocus={this.handleFocus.bind(this)}
                                        onBlur={this.handleBlur.bind(this)}
                                        onKeyDown={this.enterClick.bind(this)}
                                        onChange={this.handleChange.bind(this)} />
                                    <div className={this.state.userMessge ? "message show" : "message hide"}>1.长度为6-20个字符，支持字母，数字及"-"、"_"<br/>2.不可以输入纯数字、纯符号</div>
                                    <p className={this.state.userError ? "error show" : "error hide"} data-msg="name" dangerouslySetInnerHTML={{__html:this.state.userMsg}}></p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-input">
                                    <em className="icon-10"></em>
                                    <input
                                        className="input-text"
                                        type="password"
                                        name="passWord"
                                        placeholder="密码（6-20个字母、数字或符号）"
                                        value={this.state.passWord}
                                        onFocus={this.handleFocus.bind(this)}
                                        onBlur={this.handleBlur.bind(this)}
                                        onKeyDown={this.enterClick.bind(this)}
                                        onChange={this.handleChange.bind(this)} />
                                    <p className={this.state.passError ? "error show" : "error hide"} data-msg="pass">{this.state.passMsg}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-input">
                                    <em className="icon-9"></em>
                                    <input
                                        className="input-text"
                                        name="tel"
                                        type="text"
                                        placeholder="手机号"
                                        value={this.state.tel}
                                        onFocus={this.handleFocus.bind(this)}
                                        onBlur={this.handleBlur.bind(this)}
                                        onKeyDown={this.enterClick.bind(this)}
                                        onChange={this.handleChange.bind(this)} />
                                    <p className={this.state.telError ? "error show" : "error hide"} data-msg="name" dangerouslySetInnerHTML={{__html:this.state.telMsg}}></p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-input">
                                    <em className="icon-11"></em>
                                    <input
                                        className="input-text input-code"
                                        name="code"
                                        type="text"
                                        placeholder="验证码"
                                        value={this.state.code}
                                        onFocus={this.handleFocus.bind(this)}
                                        onKeyDown={this.enterClick.bind(this)}
                                        onChange={this.handleChange.bind(this)} />
                                    <p className={this.state.codeError ? "error show" : "error hide"} data-msg="name">{this.state.codeMsg}</p>
                                </div>
                                <input disabled={disable} type="button" className={cname} onClick={this.handleClickCode.bind(this)} value={text} />
                            </div>
                            <div className="form-btn">
                                <input
                                    type="button"
                                    value="注册"
                                    disabled={noBtn ? true : false}
                                    onClick={this.handleClick.bind(this)}
                                    className={noBtn ? "btn btn-block disable" : "btn btn-block"} />
                            </div>
                            <div className="login-link register-link">
                                <span className="gray">点击注册即表示您同意</span><a href="javascript:;" className="blue" onClick={this.showDialog.bind(this)}>《国美内容创作平台协议》</a>
                            </div>
                            <div id="vm-dialog"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;