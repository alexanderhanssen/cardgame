var DrawCard = React.createClass({
	handleClick: function(e){
		this.props.onDrawCard();
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