// import 'gomeplus';
import FastClick from 'fastclick';
import opg from '../src/gomeplus';

FastClick.attach(document.body);

/* toast */
document.querySelector('#toastBtn').addEventListener('click', function () {
    opg.ui.toast('正在加载...', {
        duration: 3000,
        // className: "m-toast-logo"
        className: "bears"
    });
});


/* share */
document.querySelector('#shareBtn').addEventListener('click', function () {
    opg.ui.share([
        {
            label: '微博',
            class:'weibo',
            onClick: function () {
                console.log('微博');
            }
        }, {
            label: '微信',
            class:'weixin',
            onClick: function () {
                console.log('微信');
            }
        }, {
            label: '朋友圈',
            class:'friends',
            onClick: function () {
                console.log('朋友圈');
            }
        }, {
            label: 'QQ',
            class:'qq',
            onClick: function () {
                console.log('QQ');
            }
        }, {
            label: 'QQ空间',
            class:'qzone',
            onClick: function () {
                console.log('QQ空间');
            }
        }
    ], [
        {
            label: '取消',
            onClick: function () {
                console.log('取消');
            }
        }
    ], {
        className: "custom-classname"
    });
});

/* tab */
opg.ui.tab('#tab',{
    defaultIndex: 0,
    onChange: function(index){
        console.log(index);

        if(index == 3){

        }
    }
});
