var _ = require('lodash');
var DrawCard = require('./DrawCard.js');
var _cards = require('./Cards.js');
var TableCard = _cards.TableCard;
var ReactCSSTransitionGroup = React.addons.ReactCSSTransitionGroup;

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

// var CardList = React.createClass({
// 	render: function() {
// 		var numberOfCards = this.props.data.length;
		
// 		return (
// 			<div className="hands-cards">
// 				<div>{numberOfCards} console</div>
// 			</div>
// 		);
// 	}
// });

var TableCardList = React.createClass({
	handleReleaseCard: function(left, suit, number, stacks){
		var cards = this.state.cards;
		var card = {
			suit: suit,
			number: number,
			stacks: stacks
		};
		var numberOfCards = cards.length;
		if(left >= -200 && left <= -100){
			return this.canCardBePlacedAtPosition(card, 2, stacks);
		}
		if(left >= -500 && left <= -375){
			return this.canCardBePlacedAtPosition(card, 4, stacks);
		}
		return {
			suit: suit,
			number: number,
			canBePlaced: false,
			stacks: stacks
		};
	},
	canCardBePlacedAtPosition: function(card, position, stacks){
		var cards = this.state.cards;
		var numberOfCards = cards.length;
		if(cards.length < numberOfCards) return false;
		var cardIndex = _.findIndex(cards, card);
		var targetCard;
		if(position === 2){
			targetCard = cards[cardIndex -1];
		}
		if(position === 4){
			targetCard = cards[cardIndex - 3];
		}
		if(card.number === targetCard.number || card.suit === targetCard.suit){
			var consecutiveCardMoves = this.state.consecutiveCardMoves;
			if(position === 4){
				var targetIndex = _.findIndex(cards, targetCard);
				cards[cardIndex].stacks = targetCard.stacks + card.stacks + 1;
				card.stacks = targetCard.stacks + card.stacks + 1
				_.pull(cards, targetCard);
				cards.move(cardIndex - 1, targetIndex);
				this.setState({
					cards: cards,
					consecutiveCardMoves: ++consecutiveCardMoves
				});
			}else{
				cards[cardIndex].stacks = targetCard.stacks + card.stacks + 1;
				card.stacks = targetCard.stacks + card.stacks + 1;
				_.pull(cards, targetCard);
				this.setState({
					cards: cards,
					consecutiveCardMoves: ++consecutiveCardMoves
				});
			}

			//Avoid moving around after placing card
			var tableWidth = document.querySelector('.table').scrollWidth;
			var boardWidth = document.querySelector('.table-cards').scrollWidth;
			var cardListWidth = document.querySelector('.table-cards .card-list').scrollWidth;
			var cardsCombinedWidth = numberOfCards * 150;
  			if(boardWidth > tableWidth && this.state.consecutiveCardMoves === 1 && cardListWidth < cardsCombinedWidth ){
  				document.querySelector(".table-cards .card-list").style.minWidth = boardWidth + 150 + "px";
  				document.querySelector(".table-cards").scrollLeft = 10000;
  			}
  			if((cardListWidth - 150)  === cardsCombinedWidth){
  				document.querySelector('.table-cards .card-list').style.minWidth = 0;
  			}

			return {
				suit: card.suit,
				number: card.number,
				canBePlaced: true,
				stacks: card.stacks
			};
		}
		return {
			suit: card.suit,
			number: card.number,
			canBePlaced: false,
			stacks: card.stacks
		};
	},
	handleDrawCard: function(){
		this.props.onDrawCard();
		this.setState({
			consecutiveCardMoves: 0
		});
		console.log("wat");
	},
	getInitialState: function() {
    	return {cards: [], shouldSetMinWidth : true};
  	},
  	componentWillReceiveProps: function(nextProps) {
  		var cards = this.state.cards;
  		var card = nextProps.data[nextProps.data.length - 1];
  		cards.push(card);
  		this.setState({
  			cards: cards
  		});
  	},
  	componentDidMount: function() {
  		var cards = this.state.cards;
  		cards.push({suit: this.props.data[0].suit, number: this.props.data[0].number, stacks: this.props.data[0].stacks});
  		this.setState({
  			cards: cards
  		});
  		console.log("card?!");
  	},
	render: function(){
		var cards = this.props.data;
		var cardsNotBelowOtherCards = _.without(this.state.cards, cards);
		var cardNodes = cardsNotBelowOtherCards.map(function(card, index){
			return (
				<TableCard suit={card.suit} number={card.number} key={index} onDrop={this.handleReleaseCard} stacks={card.stacks} />
			);
		}.bind(this));
		var numberOfCards = cardsNotBelowOtherCards.length;

		return (
			<div className="table-cards">
				<div className="card-stacks">Total stacks of cards: {numberOfCards} </div>
				<div className="card-list">
			          {cardNodes}
				</div>
				<DrawCard cardsDrawn={cards.length} onDrawCard={this.handleDrawCard} />
			</div>
		);
	}
});

module.exports.TableCardList = TableCardList;