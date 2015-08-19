var CardStore = require('../CardStore');
var CardActions = require('../CardActions');

function getComponentState(){
	return {
		cardsLeft: CardStore.getCardsLeftCount(),
    cardStacks: CardStore.getCardStackCount(),
    lang: CardStore.getLang()
	};
}

var CardsLeft = React.createClass({
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
    var cardsLeft = CardStore.getCardsLeftText();
    var stacks = CardStore.getStacksText();
    return (
      <div className="card-counter">
        <div className="cards-left">{this.state.cardsLeft} {cardsLeft}</div>
        <div className="total-stacks"><b>{this.state.cardStacks}</b> {stacks}</div>
      </div>
    );
  },
  
  _onChange: function() {
    this.setState(getComponentState());
  }
});

module.exports = CardsLeft;