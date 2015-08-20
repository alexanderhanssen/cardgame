var React = require('react/addons');
window.React = React;
var Table = require('./components/Table');
var DrawCard = require('./components/DrawCard');
var CardActions = require('./CardActions');
var CardStore = require('./CardStore');

var content = document.getElementById('content');
var Game = React.createClass({
	componentDidMount: function(){
		document.addEventListener("keydown", function(event){
			if(event.keyCode === 32 && CardStore.getCardsLeftCount() > 0){
				CardActions.drawCard();
			}
		},false);
		content.style.opacity = 1;
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
	<Game />, content
);