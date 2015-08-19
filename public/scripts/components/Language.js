var CardStore = require('../CardStore');
var CardActions = require('../CardActions');

function getComponentState(){
	return {
		lang: CardStore.getLang(),
	};
}

var CardsLeft = React.createClass({
	handleClickEn: function(){
		CardActions.changeLang("en");
	},
	handleClickNo: function(){
		CardActions.changeLang("no");
	},
  getInitialState: function() {
    return getComponentState();
  },
  componentDidMount: function() {
    CardStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    CardStore.removeChangeListener(this._onChange);
  },
  render: function() {
  	var className = "lang lang-" + this.state.lang;
    return (
      <div className={className}>
        <div className="no" onClick={this.handleClickNo}>Norsk</div>
        <div className="en" onClick={this.handleClickEn}>English</div>
      </div>
    );
  },
  
  _onChange: function() {
    this.setState(getComponentState());
  }
});

module.exports = CardsLeft;