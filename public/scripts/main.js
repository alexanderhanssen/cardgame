var React = require('react/addons');
window.React = React;
var Table = require('./components/Table.js');

var Game = React.createClass({
	render: function() {
		return (
			<div className="game">
				<Table/>
			</div>
		);
	}
});

React.render(
	<Game />, document.getElementById('content')
);