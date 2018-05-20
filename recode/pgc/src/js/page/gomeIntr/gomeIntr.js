/* css */
import 'css/page/gomeIntr/index.scss';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class GomeIntr extends Component{
    constructor(props){
        super();

    }

    render(){
        console.log(this.props.location);
        return(
            <div>
                test
            </div>
        );
    }
}

export default GomeIntr;
