import React from 'react';

class CommentDialog extends React.Component{
    constructor(props){
        super(props);
        this.onOk = this.onOk.bind(this);
        this.onCacel = this.onCacel.bind(this);
        this.state={
            show:true,
            hideTag:""
        }
    }

    componentDidMount(){
        console.log("render");
        if(this.props.fetch.keyValue == "delete"){
            this.setState({
                hideTag:"hide"
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.fetch.keyValue == "delete"){
            this.setState({
                show: true,
                hideTag:"hide"
            });
        }else {
            this.setState({
                show: true,
                hideTag:""
            });
        }

    }
    onOk(){
        this.setState({
            show: false
        });
        this.props.onOk(this.props.fetch);

    }
    onCacel(){
        this.setState({
            show: false
        });
    }

    render(){
        if(this.state.show){
            return(
            <div>
                <div className="dialog-bg show"></div>
                <div className="dialog-new show">
                    <div className="title">{this.props.param.title}</div>
                    <div className="btn-box">
                        <a onClick={this.onOk} href="javascript:;" className="btn sure">确定</a>
                        <a  onClick={this.onCacel}href="javascript:;" className={"btn "+this.state.hideTag}>取消</a>
                    </div>
                </div>
            </div>
            );
        }else{
            return null;
        }
    }
}

export  default CommentDialog;