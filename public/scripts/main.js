var React = require('react/addons');
window.React = React;
var Table = require('./components/Table');
var CardsLeft = require('./components/CardsLeft');
var DrawCard = require('./components/DrawCard');
var CardActions = require('./CardActions');

var Game = React.createClass({
	render: function() {
		return (
			<div className="game">
				<Table/>
				<DrawCard/>
				<CardsLeft/>
			</div>
		);
	}
});

React.render(
	<Game />, document.getElementById('content')
);