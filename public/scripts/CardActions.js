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
	},
	toggleModal: function(){
		AppDispatcher.handleViewAction({
			actionType: CardConstants.TOGGLE_MODAL
		})
	},
	gameOver: function(){
		AppDispatcher.handleViewAction({
			actionType: CardConstants.GAME_OVER
		})
	},
	submitScore: function(data){
		AppDispatcher.handleViewAction({
			actionType: CardConstants.SUBMIT_SCORE,
			data: data
		})
	}
};

module.exports = CardActions;