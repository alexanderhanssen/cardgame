var TableCardList = require('./TableCardList');
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
	    CardStore.addChangeListener(this._onChange);
  	},
  	getInitialState: function() {
    	return getAppState();
  	},
  	componentDidUpdate: function(prevProps, prevState){
  		// var tableCards = document.querySelector('.table-cards');
  		// if(tableCards){
    //     var cardListWidth = document.querySelector('.table-cards .card-list').scrollWidth;
		  //   var cardsCombinedWidth = document.querySelectorAll('.table-card').length * 150;
			 //  if(cardsCombinedWidth >= cardListWidth){
  		// 		  tableCards.scrollLeft = 10000;
			 //   }
  		// }
  	},
  	render: function() {
  		if(this.state.tableCards.length){
			   return (
	  			<div className="table">
	  				<TableCardList data={this.state.tableCards} onDrawCard={this.handleDrawCard}/>
	  			</div>
			   );
      }
      return null;
  	},
  	_onChange: function() {
    	this.setState(getAppState());
  	}
});

module.exports = Table;