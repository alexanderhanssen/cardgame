var CardStore = require('../CardStore');
var CardActions = require('../CardActions');
var Modal = require('react-modal');

function getComponentState(){
	return {
		score: CardStore.getScore(),
    open: CardStore.isModalOpen(),
    gameOver: CardStore.isGameOver(),
    hasSubmittedScore: CardStore.hasSubmittedScore(),
    playerName: ''
	};
}

var appElement = document.getElementById('content');

Modal.setAppElement(appElement);
Modal.injectCSS();

var HighScore = React.createClass({
  submitScore: function(){
    CardActions.submitScore(this.state.playerName);
  },
  handleInputChange: function(event){
    this.setState({playerName: event.target.value});
  },
  // Use getAppState method to set initial state
  getInitialState: function() {
    return getComponentState();
  },
  
  // Listen for changes
  componentDidMount: function() { 
    CardStore.addChangeListener(this._onChange);
  },

  // Unbind change listener
  componentWillUnmount: function() {
    CardStore.removeChangeListener(this._onChange);
  },
  closeModal: function(){
    CardActions.toggleModal();
  },
  render: function() {
    var scores = this.state.score.map(function(score, index){
      return (
        <div className="single-score" key={index}>
          <div>{score.score} bunker - {score.name}</div>
        </div>
      );
    });
    if(this.state.gameOver && this.state.hasSubmittedScore || !this.state.gameOver){
      return (
        <Modal isOpen={this.state.open} onRequestClose={this.closeModal}>
            <div className="close-modal" onClick={this.closeModal}>X</div>
            <h1 className="score-header">Rekorder</h1>
            <div className="all-scores">
              {scores}
            </div>
        </Modal>
      );
    }else{
      var score = CardStore.getCardStackCount();
      return (
        <Modal isOpen={this.state.open} onRequestClose={this.closeModal}>
            <div className="close-modal" onClick={this.closeModal}>X</div>
            <h1 className="score-header">HighScore</h1>
            <div className="all-scores">
              {scores}
            </div>
            <div className="submit-wrapper">
              <input type="text" id="player-name" value={this.state.playerName} onChange={this.handleInputChange} required pattern=".{3,}"/>
              <div>{score} bunker</div>
              <button onClick={this.submitScore}>Send inn</button>
            </div>
        </Modal>
      )
    }
  },
  
  // Update view state when change event is received
  _onChange: function() {
    this.setState(getComponentState());
  }

});

module.exports = HighScore;