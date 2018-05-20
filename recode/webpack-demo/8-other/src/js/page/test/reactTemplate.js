//var React = require('react');

var ProductBox = React.createClass({
	propTypes:{
		title:React.PropTypes.string
	},
    render: function () {
        return (
            <div className="productBox">
				{this.props.title}
            </div>
        );
    }
});

module.exports = ProductBox;