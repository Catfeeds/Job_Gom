/* css */
import 'css/page/gomeIntr/index.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from 'components/Header';

let $gomeIntrBox = document.getElementById("gomeIntrId");
if( $gomeIntrBox ){
    ReactDOM.render(
        <Header/>,
        $gomeIntrBox
    );
}
