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
	render: function() {
		if(this.state.tableCards.length){
		   return (
  			<div className="table">
  				<TableCardList data={this.state.tableCards}/>
  			</div>
		   );
    }
    return (
     <div className="table"></div>
    );
  	},

  	_onChange: function() {
    	this.setState(getAppState());
  	}
});

module.exports = Table;