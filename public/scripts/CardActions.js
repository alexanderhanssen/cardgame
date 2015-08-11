var AppDispatcher = require('./AppDispatcher');
var CardConstants = require('./CardConstants');

var CardActions = {
	drawCard: function(){
		AppDispatcher.handleViewAction({
			actionType: CardConstants.DRAW_CARD
		})
	},
	placeCard: function(data){
		AppDispatcher.handleViewAction({
			actionType: CardConstants.PLACE_CARD,
			data: data
		})
	}
};

module.exports = CardActions;