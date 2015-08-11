var CardActions = require('../CardActions');

var DrawCard = React.createClass({
	handleClick: function(e){
		CardActions.drawCard();
	},
	
	render: function() {
		var className = "cards drawn-" + this.props.cardsDrawn;
		return (
            <div className="draw-card">
				<button onClick={this.handleClick}>
					<div className={className}>
						<div></div>
						<div></div>
						<div></div>
					</div>
					
				</button> 
			</div>
		)
	}
});

module.exports = DrawCard;