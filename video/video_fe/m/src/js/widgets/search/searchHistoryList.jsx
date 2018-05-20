import React from 'react';

export default class SearchHistoryList extends React.Component {
    handleHistory=(e)=>{
        this.props.handleSetKeyWord(e.target.attributes.getNamedItem('data-item').nodeValue);
    }
    render() {
        let rows = this.props.searchHistoryList.map((item, index) => {
            //let url = "/search/index?keyword=" + item;
            return <a href="javascript:;" key={index} onClick={this.handleHistory}  data-item={item}><span data-item={item}>{item}</span></a>;
        });
        return (
            <div>
                {rows}
            </div>
        );
    }
}