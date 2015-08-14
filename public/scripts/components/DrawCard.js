var CardActions = require('../CardActions');
var CardStore = require('../CardStore');
var CardsLeft = require('./CardsLeft');
var Rules = require('./Rules');
var Language = require('./Language');
var HighScore = require('./HighScore');
var SubmitScore = require('./SubmitScore');

function getComponentState(){
	return {
		cardsLeft: CardStore.getCardsLeftCount()
	};
}

var DrawCard = React.createClass({
	handleClick: function(e){
		CardActions.drawCard();
	},
	openHighscore: function(){
		CardActions.toggleModal();
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
		if(this.state.cardsLeft === 0){
			return (
	            <div className="draw-card">
					<SubmitScore/>
					<CardsLeft/>
					<Rules/>
					<Language/>
					<HighScore/>
					<div className="open-highscore" onClick={this.openHighscore}>
						Plasseringer
					</div>
				</div>
			)
		}else{
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
					<HighScore/>
					<div className="open-highscore" onClick={this.openHighscore}>
						Plasseringer
					</div>
				</div>
			)
		}
		
	},
	_onChange: function(){
		this.setState(getComponentState());
	}
});

module.exports = DrawCard;