var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CardConstants = require('./CardConstants');
var allCards = require('./allCards');
var xhr = require('superagent');

var CHANGE_EVENT = 'change';

//Initial values
var _tableCards = [];
var _handsCards = _.shuffle(allCards.getAll());
var _cardsLeftCount = _handsCards.length;
//var _handsCards = allCards.getAll();
var _consecutiveCardMoves = 0;
var _language = "no";
var _highScore = [];
var _modalIsOpen = false;
var _scoreFetched = false;
var _gameOver = false;
var _hasSubmittedScore = false;

function cardsLeft(){
	_cardsLeftCount = _handsCards.length;
}

function drawCard(){
	var cardToPlaceOnTable = _handsCards.shift();
	_tableCards.push(cardToPlaceOnTable);
	_consecutiveCardMoves = 0;
}

function changeLang(lang){
	_language = lang;
}

function placeCard(data){
	var position;
	if(data.left >= -200 && data.left <= -100){
		position = 1;
	}else if(data.left >= -500 && data.left <= -375){
		position = 3;
	}else{
		//Invalid position, still triggers change and puts card back into original position
		return;
	}
	var card = {
		suit: data.suit,
		number: data.number,
		stacks: data.stacks
	};

	var cards = _tableCards;
	var cardIndex = _.findIndex(cards, card);
	var targetCard = cards[cardIndex - position];
	if(!targetCard) return;
	if(card.number === targetCard.number || card.suit === targetCard.suit){
		if(position === 3){
			var targetIndex = _.findIndex(cards, targetCard);
			cards[cardIndex].stacks = targetCard.stacks + card.stacks + 1;
			card.stacks = targetCard.stacks + card.stacks + 1
			_.pull(cards, targetCard);
			cards.move(cardIndex - 1, targetIndex);
			_tableCards = cards;
			_consecutiveCardMoves++;
		}else{
			cards[cardIndex].stacks = targetCard.stacks + card.stacks + 1;
			card.stacks = targetCard.stacks + card.stacks + 1;
			_.pull(cards, targetCard);
			_tableCards = cards;
			_consecutiveCardMoves++;
		}
	}
}

function toggleModal(){
	_modalIsOpen = !_modalIsOpen;
	var content = document.getElementById('content');
	if(_modalIsOpen){
		content.style.opacity = 0;
	}else{
		content.style.opacity = 1;
	}
}

function submitScore(name){
	var score = _tableCards.length;
	var data = {
		Score: score,
		Name: name,
		Date: new Date()
	};
	var apiUrl = process.env.NODE_ENV === 'production' ? '//kortspill-api.azurewebsites.net/api/records' : '/score.json';
	xhr.post(apiUrl).send(data).end(function(err, res){
			if(res.ok){
				_hasSubmittedScore = true;
				_scoreFetched = false;
				CardStore.emitChange();
			}else{
				console.log(err);
			}
	});
}

var CardStore = assign({}, EventEmitter.prototype, {
	getCardsLeftCount: function(){
		return _cardsLeftCount;
	},
	getCardStackCount: function(){
		return _tableCards.length;
	},
	getTableCards: function(){
		return _tableCards;
	},
	getHandsCards: function(){
		return _handsCards;
	},
	getConsecutiveCardMoves: function(){
		return _consecutiveCardMoves;
	},
	getLang: function(){
		return _language;
	},
	getRulesText: function(){
		if(_language === "no"){
			return {
				header: "Regler",
				text: "Flytt ett kort over ett annet med samme kappe(♠, ♦, ♥, ♣) eller samme verdi. Du kan kun flytte kortet en eller tre posisjoner til venstre. Målet er færrest mulig bunker når alle kort er trekt."
			}
		}
		if(_language === "en"){
			return {
				header: "Rules",
				text: "Move a card over another with the same suit(♠, ♦, ♥, ♣) or same value. You can only move the card one or three positions to the left. The goal is to have as few stacks as possible when all cards are drawn."
			}
		}
	},
	getCardsLeftText: function(){
		if(_language === "no"){
			return "kort igjen";
		}
		if(_language === "en"){
			if(this.getCardsLeftCount() === 1){
				return "card left";
			}else{
				return "cards left";
			}
		}
	},
	getStacksText: function(){
		if(_language === "no"){
			if(this.getCardStackCount() === 1){
				return "bunke";
			}else{
				return "bunker";
			}
		}
		if(_language === "en"){
			if(this.getCardStackCount() ===  1){
				return "stack";
			}else{
				return "stacks";
			}
		}
	},
	getScore: function(){
		var that = this;
		var apiUrl = process.env.NODE_ENV === 'production' ? '//kortspill-api.azurewebsites.net/api/records' : '/score.json';
		if(!_scoreFetched && _modalIsOpen){
			xhr.get(apiUrl).end(function(err, res) {
	  		if(err) {
          	console.log(err);
	      	}else{
	      		_scoreFetched = true;
	      		var sortedTop15 = _.take(_.sortByOrder(res.body,['Score'],['asc']), 15);
	      		_highScore = sortedTop15;
	      		that.emitChange();
	      }
			});
		}
		return _highScore;
	},
	isModalOpen: function(){
		return _modalIsOpen;
	},
	isGameOver: function(){
		return _gameOver;
	},
	hasSubmittedScore: function(){
		return _hasSubmittedScore;
	},
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},

	/**
   	* @param {function} callback
   	*/
  	addChangeListener: function(callback) {
    	this.on(CHANGE_EVENT, callback);
  	},

	/**
	* @param {function} callback
	*/
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case CardConstants.DRAW_CARD:
			drawCard();
			cardsLeft();
			CardStore.emitChange();
			break;

		case CardConstants.PLACE_CARD:
			placeCard(action.data);
			CardStore.emitChange();
			break;
		case CardConstants.CHANGE_LANG:
			changeLang(action.lang);
			CardStore.emitChange();
			break;
		case CardConstants.GET_HIGHSCORE:
			getHighscore();
			CardStore.emitChange();
			break;
		case CardConstants.TOGGLE_MODAL:
			toggleModal();
			CardStore.emitChange();
			break;
		case CardConstants.GAME_OVER:
			_gameOver = true;
			CardStore.emitChange();
			break;
		case CardConstants.SUBMIT_SCORE:
			submitScore(action.data);
			CardStore.emitChange();
			break;
	}

	return true; // No errors. Needed by promise in Dispatcher.
});

module.exports = CardStore;
