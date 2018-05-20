import React, {Component} from 'react';


class VideoSubDialog extends Component{

    constructor(props){
        super(props);
        this.state={
            visible : this.props.visible,
            unClick : this.props.unClick
        };
        this.onCancle = this.onCancle.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOk = this.onOk.bind(this);
    }

    _deletHTML() {
        this.setState((prevState)=>({visible : !prevState.visible}));
    }
    onClose(){
        this._deletHTML();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            visible : true,
            unClick : nextProps.unClick
        });
    }


    onCancle(){
        this._deletHTML();
    }
    onOk(){
        var s = this.props.onOk();
        if(s){
            this._deletHTML();
        }

    }


    footer(){
        var className = 'btn okBtn ' + this.props.unClick;
        var onOk = this.props.ok ?  <span className={className} onClick={this.onOk}>{this.props.ok}</span> : null;
        var onOff = this.props.off ? <span className="btn offBtn" onClick={this.onClose}>取消</span> : null;
        return(
            <div className = {this.props.footer}>
                {onOk}
                {onOff}
            </div>
        );
    }
    header(title) {
        if(title){
            return (
                <p>{title}</p>
            );
        }
        return null;
    }

    render() {
            var container = this.props.children || '';
            var header = this.props.header || this.header(this.props.title);
            var minBox = this.props.width!="590" ? "minBox" :"";
            var className = "dialogBox "+ minBox;
            if (!this.state.visible) {
                return null;
            } else {
                return (
                    <div className='dialogMessage'>
                        <div className="shadeBox">
                        </div>
                        <div className={className}>
                            <div className="messageHeader" >
                                {header}
                                <em className="icon-19" onClick={this.onClose}></em>
                            </div>
                            {container}
                            {this.footer()}
                        </div>
                    </div>

                );
            }
        }

}
export  default VideoSubDialog