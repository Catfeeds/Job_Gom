import React from 'react';

class TitleField extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            val: this.props.value || '',
            err: ''
        };
    }

    resetTitle = () => {
      this.setState({
        val: ''
      }, () => {
        this.error('');
      })
    }

    validate = (val) => {
        val = val.trim();
        let len = val.length;
        let err = '';
        // console.log(len)
        if(len < 2 || len > 30){
            err = '请填写2-30个字（汉字、字母或符号）的标题';
        }
        return err;
    }

    error(err) {
        this.setState({
            err: err
        });
    }

    onBlur = (e) => {
        let val = e.target.value.trim();
        this.error(this.validate(val));
    }

    onChange = (e) => {
        let val = e.target.value;
        this.setState({
            val: val
        }, function(){
            this.props.onChange(val);
        });
    }

    onKeyDown = (e) => {
      e = e || window.event;
      var keyCode = e.keyCode || e.which;
      if (keyCode === 9 && this.isFirefox()) {
          e.target.focus();
          e.preventDefault();
      }
    }

    isFirefox = () => {
      if (navigator.userAgent.indexOf("Firefox") > -1) {
        return true;
      } else {
        return false;
      }
    }

    render(){
        let err = this.state.err;
        let errClsName = 'error';
        if(err.length > 0){
            errClsName += ' show ';
        }
        return(
            <div className="form-input">
                <input
                    className="input-text"
                    data-id="inputText"
                    type="text"
                    placeholder="2-30个汉字、字母或符号"
                    value={this.state.val}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                />
                <p className={errClsName}>{err}</p>
            </div>
        );
    }
}

export default TitleField;
