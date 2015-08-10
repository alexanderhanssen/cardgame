var AppDispatcher = require('./AppDispatcher');
var CardConstants = require('./CardConstants');

var CardActions = {
	updateCardsLeft: function(val){
		AppDispatcher.handleViewAction({
			actionType: CardConstants.UPDATE_CARDS_LEFT,
			val: val
		})
	}
};

module.exports = CardActions;