var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CardConstants = require('./CardConstants');
var allCards = require('./allCards');

var CHANGE_EVENT = 'change';

var _cardsLeftCount = 52;
var _tableCards = [];
var _handsCards = _.shuffle(allCards.getAll());

function cardsLeft(){
	_cardsLeftCount = _handsCards.length;
}

function drawCard(){
	var cardToPlaceOnTable = _handsCards.shift();
	_tableCards.push(cardToPlaceOnTable);
}

var CardStore = assign({}, EventEmitter.prototype, {
	getCardsLeftCount: function(){
		return _cardsLeftCount;
	},

	getTableCards: function(){
		return _tableCards;
	},

	getHandsCards: function(){
		return _handsCards;
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
	var val;

	switch(action.actionType) {
		case CardConstants.DRAW_CARD:
			drawCard();
			cardsLeft();
			CardStore.emitChange();
			break;

		// case TodoConstants.TODO_DESTROY:
		// destroy(action.id);
		// TodoStore.emitChange();
		// break;

		// add more cases for other actionTypes, like TODO_UPDATE, etc.
	}

	return true; // No errors. Needed by promise in Dispatcher.
});

module.exports = CardStore;
