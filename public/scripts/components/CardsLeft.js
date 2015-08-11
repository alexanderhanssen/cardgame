var CardStore = require('../CardStore');
var CardActions = require('../CardActions');

function getAppState(){
	return {
		cardsLeft: CardStore.getCardsLeftCount()
	};
}

var CardsLeft = React.createClass({
  handleClick: function(){
  	console.log("click?!");
  	CardActions.updateCardsLeft(51);
  },
  // Use getAppState method to set initial state
  getInitialState: function() {
    return getAppState();
  },
  
  // Listen for changes
  componentDidMount: function() {
    CardStore.addChangeListener(this._onChange);
  },

  // Unbind change listener
  componentWillUnmount: function() {
  	console.log("Gone?!");
    CardStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div onClick={this.handleClick}>{this.state.cardsLeft}</div>
    );
  },
  
  // Update view state when change event is received
  _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = CardsLeft;