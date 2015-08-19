var React = require('react/addons');
window.React = React;
var Table = require('./components/Table');
var DrawCard = require('./components/DrawCard');
var CardActions = require('./CardActions');
var CardStore = require('./CardStore');

var Game = React.createClass({
	componentDidMount: function(){
		document.addEventListener("keydown", function(event){
			if(event.keyCode === 32 && CardStore.getCardsLeftCount() > 0){
				CardActions.drawCard();
			}
		},false);
	},
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