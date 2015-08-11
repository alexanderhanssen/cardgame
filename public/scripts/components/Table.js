var _ = require('lodash');
var allCards = require('../allCards');
var CardLists = require('./CardLists');
var CardList = CardLists.CardList;
var TableCardList = CardLists.TableCardList;
var DrawCard = require('./DrawCard');
var CardStore = require('../CardStore');
var CardActions = require('../CardActions');

function getAppState(){
	return {
		handsCards: CardStore.getHandsCards(),
		tableCards: CardStore.getTableCards(),
	};
}

var Table = React.createClass({
	componentDidMount: function() {
  		console.log("Started?");
	    CardStore.addChangeListener(this._onChange);
  	},
  	getInitialState: function() {
    	return getAppState();
  	},
  	componentDidUpdate: function(prevProps, prevState){
  		console.log("table compo updated");
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
	  			</div>
			);
  		}else{
			return (
	  			<div className="table">
	  				<DrawCard onDrawCard={this.handleDrawCard} />
	  			</div>
			);
  		}
  	},
  	_onChange: function() {
    	this.setState(getAppState());
  	}
});

module.exports = Table;