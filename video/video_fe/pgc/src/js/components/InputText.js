/**
 * [input]
 * @Author: zhangzhao
 * @Email:  zhangzhao@gomeplus.com
 * props:{
 * 		className: input-text,
 * 		onFocus,
 * 		onBlur,
 * 		onChange,
 * 		value,
 * 		name,
 * 		id,
 * 		placeholder
 * }
 */
import 'css/components/textarea-editor.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputText extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value
        }
        this.change = this.change.bind(this);
    }
    change(e){
        let val = e.target.value;
        this.setState({
            value: val
        }, function(){
            this.props.onChange(val);
        });
    }

    render(){
        let width = this.props.width;
        let height = this.props.height;
        let styles = {width,height}
        return (
            <input
                type="text"
                className={this.props.className}
                style={styles}
                onChange={this.change}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                name={this.props.name}
                id={this.props.id}
                placeholder={this.props.placeholder}
                value={this.state.value}>
            </input>
        )
    }
}

let noop = function(){};

InputText.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func
}
InputText.defaultProps = {
    className: 'input-text',
    placeholder: '',
    value: '',
    onFocus: noop,
    onBlur: noop,
    onChange: noop
}

export default InputText;