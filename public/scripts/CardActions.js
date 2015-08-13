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
	},
	changeLang: function(lang){
		AppDispatcher.handleViewAction({
			actionType: CardConstants.CHANGE_LANG,
			lang: lang
		})
	}

};

module.exports = CardActions;