var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CardConstants = require('./CardConstants');

var CHANGE_EVENT = 'change';

var _cardsLeftCount = 52;

function update(val){
	_cardsLeftCount = val;
}

var CardStore = assign({}, EventEmitter.prototype, {
	getCardsLeftCount: function(){
		return _cardsLeftCount;
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
		case CardConstants.UPDATE_CARDS_LEFT:
			val = action.val;
			update(val);
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
