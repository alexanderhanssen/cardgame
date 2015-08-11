var CardStore = require('../CardStore');
var CardActions = require('../CardActions');

function getComponentState(){
	return {
		cardsLeft: CardStore.getCardsLeftCount(),
    cardStacks: CardStore.getCardStackCount()
	};
}

var CardsLeft = React.createClass({
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
  	console.log("Gone?!");
    CardStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <div className="cards-count">{this.state.cardsLeft}</div>
        <div>Total stacks: {this.state.cardStacks}</div>
      </div>
    );
  },
  
  // Update view state when change event is received
  _onChange: function() {
    this.setState(getComponentState());
  }

});

module.exports = CardsLeft;