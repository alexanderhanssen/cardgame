var AppDispatcher = require('./AppDispatcher');
var CardConstants = require('./CardConstants');

var CardActions = {
	drawCard: function(){
		AppDispatcher.handleViewAction({
			actionType: CardConstants.DRAW_CARD
		})
	}
};

module.exports = CardActions;