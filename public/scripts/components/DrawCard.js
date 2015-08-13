var CardActions = require('../CardActions');
var CardStore = require('../CardStore');
var CardsLeft = require('./CardsLeft');
var Rules = require('./Rules');
var Language = require('./Language');

function getComponentState(){
	return {
		cardsLeft: CardStore.getCardsLeftCount()
	};
}

var DrawCard = React.createClass({
	handleClick: function(e){
		CardActions.drawCard();
	},
	getInitialState: function() {
    	return getComponentState();
  	},
	componentDidMount: function() {
		CardStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		CardStore.removeChangeListener(this._onChange);
  	},
	render: function() {
		var className = "cards drawn-" + (52 - this.state.cardsLeft);
		return (
            <div className="draw-card">
				<div onClick={this.handleClick} className={className}>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<CardsLeft/>
				<Rules/>
				<Language/>
			</div>
		)
	},
	_onChange: function(){
		this.setState(getComponentState());
	}
});

module.exports = DrawCard;