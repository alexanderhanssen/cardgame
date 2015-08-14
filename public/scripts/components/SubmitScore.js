var CardActions = require('../CardActions');
var CardStore = require('../CardStore');

function getComponentState(){
	return {
		hasSubmittedScore: CardStore.hasSubmittedScore()
	}
}

var SubmitScore = React.createClass({
	submitScore: function(){
		CardActions.gameOver();
		CardActions.toggleModal();
	},
	restartGame: function(){
		window.location.reload();
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
		if(!this.state.hasSubmittedScore){
			return (
	            <div className="game-over-btn" onClick={this.submitScore}>
	            	Send inn poeng
	         	</div>
			)
		}else{
			return (
				<div className="restart-btn" onClick={this.restartGame}>Start på nytt!</div>
			);
		}
	},
	_onChange: function(){
		this.setState(getComponentState());
	}
});

module.exports = SubmitScore;