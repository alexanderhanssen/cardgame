var React = require('react/addons');
window.React = React;
var Table = require('./components/Table');
var DrawCard = require('./components/DrawCard');

var Game = React.createClass({
	render: function() {
		return (
			<div className="game">
				<Table/>
				<DrawCard/>
			</div>
		);
	}
});

React.render(
	<Game />, document.getElementById('content')
);