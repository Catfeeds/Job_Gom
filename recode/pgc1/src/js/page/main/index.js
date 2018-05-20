/* css */
import 'css/page/login/index.scss';
import 'css/page/register/index.scss';
import 'css/page/main/index.scss';
import  '../gomeIntr/aboutUs';
import {
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import React, {Component} from 'react';
import {render} from 'react-dom';
import fetch from 'io/fetch.js';
import Login from './login.js';
import { page } from 'util/phpCommon.js';
import 'util/bxslider.js';

import { deleteCookie, getCookie } from 'util/cookie.js';

class Index extends Component {
    constructor(props) {
        super(props);
        
       /* this.state = {
            login: true,
            register:false
        };*/
    }
    /*handleClick(event) {
        if(event.target.name == "login"){
            this.setState({
                login: true,
                register:false
            });
        }else{
            this.setState({
                login: false,
                register:true
            });
        }
    }*/
    componentDidMount(){
        //banner
//      $('.slider').bxSlider({
//          adaptiveHeight: true,
//          startSlide: 0,
//          prev: '',
//          next: '',
//          infiniteLoop: true,
//          auto: true,
//          autoHover: true,
//          useCSS: false,
//          pause: 4000,
//      });
        //合作伙伴
        fetch.get(page.cmsApi + '/v1/cms/slot?unique_key=pgcfriend')
        .then((res)=>{
            let data = res.data;
            let list = "";
            if (data.code == 0) {
//              page.jsPath + "dist/imgs/public/new-logo.png"
                for(let i=0,len=data.data.list.length; i<len; i++){
                    list += `
                        <li>
                            <a href="${page.pubUrl}sub/${data.data.list[i].publisher_id}.html" target="_blank" alt="${data.data.list[i].name}">
                                <img src="${data.data.list[i].image}" />
                                <p>${data.data.list[i].name}</p>
                            </a>
                        </li>
                    `
                }
                $(".slider-bar").find("ul.slider2").append(list);
                $('.slider2').bxSlider({
                    pager: false,
                    slideWidth: 110,
                    minSlides: 3,
                    maxSlides: 7,
                    moveSlides: 1,
                    slideMargin: 40,
                    autoControls:false,
                    next:'<a href="javascript:;" class="next"></a>',
                    prev:'<a href="javascript:;" class="prev"></a>',
                    onSliderLoad: function(){
                        if(data.data.list.length < 8){
                            $('[data-node=partner]').find(".bx-controls-direction").hide();
                        }
                    }
                });
            }else{
                console.log('合作伙伴获取失败');
            }
        })
        .catch((err)=>{
            console.log(err);
        });
        
        //合作品牌
        fetch.get(page.cmsApi + '/v1/cms/slot?unique_key=pgcbrand')
        .then((res)=>{
            let data = res.data;
            let list = "";
            
            if (data.code == 0) {
                for(let i=0,len=data.data.list.length; i<len; i++){
                    list += `
                        <li>
                            <img src="${data.data.list[i].image}" />
                        </li>
                    `
                }
                $(".slider-bar").find("ul.slider3").append(list);
                $('.slider3').bxSlider({
                    pager: false,
                    slideWidth: 152,
                    minSlides: 2,
                    maxSlides: 6,
                    moveSlides: 1,
                    slideMargin: 20,
                    controls: true,
                    next:'<a href="javascript:;" class="next"></a>',
                    prev:'<a href="javascript:;" class="prev"></a>',
                    onSliderLoad: function(){
                        if(data.data.list.length < 7){
                            $('[data-node=brand]').find(".bx-controls-direction").hide();
                        }
                    }
                 });
                 
            }else{
                console.log('合作品牌获取失败');
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    render(){
        return(
        <div>
            <div className="list" data-node="partner">
                <h3 className="title">合作伙伴</h3>
                <div className="slider-bar">
                    <ul className="clearfix slider2">
                        
                    </ul>
                </div>
            </div>
            <div className="list list2" data-node="brand">
                <h3 className="title">合作品牌</h3>
                <div className="slider-bar">
                    <ul className="clearfix slider3">
                        
                    </ul>
                </div>
            </div>
        </div>
        )
    }
}

function renderComponents(){
    var $login = document.getElementById('login');
    var $list = document.getElementById('list');

    $login && render(
      <Login />,
      $login
    );

    $list && render(
      <Index />,
      $list
    );
}

var init = function(){
    // 判断登录状态
    let accountId = getCookie('accountId');
    if (accountId > 0) {
        fetch.get('/account/checkLoginStatus?user_id='+accountId)
        .then((res)=>{
            let data = res.data;
            if (data.code == 1) {
                if (data.data.is_login == 1) {
                    window.location.href="/portal";
                    return;
                }
            }

            deleteCookie('accountId');
            deleteCookie('username');
            renderComponents();
        }).catch((err)=>{
            console.log(err);
        });
    }else{
        deleteCookie('accountId');
        deleteCookie('username');
        renderComponents();
    }
}

export default init;
