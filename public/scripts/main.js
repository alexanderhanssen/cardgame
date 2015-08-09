var React = require('react/addons');
var Draggable = require('react-draggable');
var _ = require('lodash');
var allCards = require('./allCards.js');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

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

var Card = React.createClass({
	render: function() {
		return (
			<div className="card">
				<h3>{this.props.suit}</h3>
				<p>{this.props.number}</p>
			</div>   
		);
	}
});

var CardStack = React.createClass({
	render: function() {
		return (
			<div className="stack">
			</div>
		);
	}
})

var TableCard = React.createClass({
	getInitialState: function() {
		return {
			left: 0,
			top: 0,
		};
	},
	onStart: function(event, ui) {
      //this.setState({left: ui.position.left, top: ui.position.top});
    },

    onStop: function(event, ui) {
    	var leftPos = ui.position.left;
    	var evaluatedCard = this.props.onDrop(leftPos, this.props.suit, this.props.number, this.props.stacks);
    	if(!evaluatedCard.canBePlaced){
      		this.setState({left: 0, top: 0});
    	}
    },
    getSuitIcon: function(){
		var suitIcon;
		var suit = this.props.suit;
		switch(suit){
			case "Clubs":
				suitIcon = '♣';
				break;
			case "Diamonds":
				suitIcon = '♦'
				break;
			case "Hearts":
				suitIcon = '♥';
				break;
			case "Spades":
				suitIcon = '♠';
				break;
			default:
				suitIcon = '?';
		}
		return suitIcon;
    },
    getNumberIcon: function(){
		var number = this.props.number;
		var numberIcon;
		switch(number){
			case 11:
				numberIcon = "J";
				break;
			case 12:
				numberIcon = "Q";
				break;
			case 13:
				numberIcon = "K";
				break;
			case 14: 
				numberIcon = "A";
				break;
			default:
				numberIcon = number;
		}
		return numberIcon;
    },
    
	render: function() {
		var drags = {onStart: this.onStart, onStop: this.onStop};
		var style = 'table-card box ' + this.props.suit + " " + this.props.number;
		var stacks = [];
		for(var i = 0; i < this.props.stacks; i++){
			stacks.push(<CardStack key={i}/>);
		}
		var stackStyle;
		if(stacks.length > 0){
			stackStyle = {
				bottom: "-" + ((stacks.length*2) + 1) + "px"
			};
		}else{
			stackStyle = {
				bottom: "0px"
			};
		}
		
		console.log(stackStyle);
		return (
			<Draggable
                zIndex={100}
                start={{x: this.state.left, y: this.state.top}}
                moveOnStartChange={true}
                bounds={{left: -600, right: 0}}
                axis="x"
                {...drags}>
                <span className={style}>
					<div>
						<h1>{this.getNumberIcon()} {this.getSuitIcon()}</h1>
					</div>
					<div className="stacks" style={stackStyle}>
						{stacks}
					</div>
                </span>
            </Draggable>
		);
	}
});

var Game = React.createClass({
	render: function() {
		return (
			<div className="game">
				<Table/>
			</div>
		);
	}
});

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

var Table = React.createClass({
	fetchCards: function(){
		this.setState({
			handCards: _.shuffle(allCards.getAll()),
			//handCards: allCards.getAll(),
			tableCards: []
		});
	},
	handleDrawCard: function() {
		var cardToPlaceOnTable = this.state.handCards.shift();
		var handCards = this.state.handCards;  
		var tableCards = this.state.tableCards;
		tableCards.push(cardToPlaceOnTable);
		var drawnCards = this.state.drawnCards;
		drawnCards++;
		this.setState({ handCards: handCards, tableCards: tableCards, drawnCards: drawnCards});
	},

	componentDidMount: function() {
	    this.fetchCards();
  	},
  	getInitialState: function() {
    	return {handCards: [], tableCards : [], drawnCards: 0};
  	},
  	componentDidUpdate: function(prevProps, prevState){
  		var tableCards = document.querySelector('.table-cards');
  		if(tableCards){
  			var cardListWidth = document.querySelector('.table-cards .card-list').scrollWidth;
			var cardsCombinedWidth = document.querySelectorAll('.table-card').length * 150;
			if(cardsCombinedWidth >= cardListWidth){
  				tableCards.scrollLeft = 10000;
			}
  		}
  	},
  	render: function() {
  		if(this.state.tableCards.length){
  			return (
	  			<div className="table">
	  				<TableCardList data={this.state.tableCards} onDrawCard={this.handleDrawCard}/>
	  				<CardList data={this.state.handCards} />
	  			</div>
			);
  		}else{
			return (
	  			<div className="table">
	  				<DrawCard onDrawCard={this.handleDrawCard} />
	  				<CardList data={this.state.handCards} />
	  			</div>
			);
  		}
  	}
});

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
		console.log(stacks);
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

var CardList = React.createClass({
	render: function() {
		var numberOfCards = this.props.data.length;
		return (
			<div className="hands-cards">
				<ReactCSSTransitionGroup transitionName="counter">
					<div>
			          {numberOfCards}
					</div>
		        </ReactCSSTransitionGroup>
			</div>
		);
	}
});

React.render(
	<Game />, document.getElementById('content')
);