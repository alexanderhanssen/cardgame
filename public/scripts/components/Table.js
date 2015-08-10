var _ = require('lodash');
var allCards = require('../allCards.js');
var CardLists = require('./CardLists.js');
var CardList = CardLists.CardList;
var TableCardList = CardLists.TableCardList;
var DrawCard = require('./DrawCard.js');
var CardStore = require('../CardStore.js');

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

module.exports = Table;