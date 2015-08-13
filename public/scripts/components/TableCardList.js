var _ = require('lodash');
var DrawCard = require('./DrawCard');
var _cards = require('./Cards');
var TableCard = _cards.TableCard;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var CardStore = require('../CardStore');
var CardActions = require('../CardActions');
var scroll = require('scroll');

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

function getComponentState(){
	return {
		cards: CardStore.getTableCards(),
		consecutiveCardMoves: CardStore.getConsecutiveCardMoves()
	}
}

var TableCardList = React.createClass({
	handleReleaseCard: function(left, suit, number, stacks){
		var data = {
    		left: left,
    		suit: suit,
    		number: number,
    		stacks: stacks
    	};
    	CardActions.placeCard(data);
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
  	componentDidUpdate: function(nextProps, prevState){
		var tableEl = document.querySelector(".table-cards");
		var cardListEl = document.querySelector(".card-list");
      	if(tableEl){
      		if(cardListEl.scrollWidth > tableEl.offsetWidth && this.state.consecutiveCardMoves === 0){
        		scroll.left(tableEl, cardListEl.scrollWidth + 150, { duration: 1500, ease: 'linear'});
      		}
      		cardListEl.style.minWidth = this.state.cards.length * 150 + "px";
      		cardListEl.style.right = 0;
      	}
  	},
	render: function(){
		var cards = this.props.data;
		var cardsNotBelowOtherCards = _.without(this.state.cards, cards);
		var cardNodes = cardsNotBelowOtherCards.map(function(card, index){
			return (
				<TableCard suit={card.suit} number={card.number} key={index} index={index} onDrop={this.handleReleaseCard} stacks={card.stacks} />
			);
		}.bind(this));
		return (
			<div className="table-cards">
				<div className="card-list">
	          		{cardNodes}
				</div>
			</div>
		);
	},
	_onChange: function(){
		this.setState(getComponentState());
	}
});

module.exports = TableCardList;