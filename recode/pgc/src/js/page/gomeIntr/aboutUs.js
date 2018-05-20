/* css */
import 'css/page/gomeIntr/index.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from 'components/Header';

// class  Header extends Component{
//     constructor(){
//         super();
//     }
//     render(){
//         return (
//             <div className="head">
//
//                     <div className="logo">
//                         <img src="http://js.pre.meixincdn.com/m/vpc/dist//imgs/public/logo.png" />
//                     </div>
//                     <div className="fr">
//                         <span>nih</span>
//                         <span class="line"></span>
//                         <a href="javascript:;">退出</a>
//                     </div>
//
//             </div>
//         );
//     }
// }
let $gomeIntrBox = document.getElementById("gomeIntrId");
if( $gomeIntrBox ){
    ReactDOM.render(
        <Header/>,
        $gomeIntrBox
    );
}
