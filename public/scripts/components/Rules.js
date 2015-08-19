var CardStore = require('../CardStore');

function getComponentState(){
	return {
		lang: CardStore.getLang()
	}
}

var Rules = React.createClass({
	handleClick: function(){
		this.setState({
			closed: !this.state.closed
		});
	},
	getInitialState: function(){
		return {
			closed: true,
			lang: "no"
		};
	},
	componentDidMount: function() {
    CardStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
    CardStore.removeChangeListener(this._onChange);
	},
	render: function(){
		var rulesText = CardStore.getRulesText();
		var header = rulesText.header;
		var text = rulesText.text;
		var className = this.state.closed ? "rules closed" : "rules open";
		return (
			<div className={className}>
				<h3 onClick={this.handleClick}><span className="triangle"></span>{header}</h3>
				<div className="text">{text}</div>
			</div>
		);
	},
	
	_onChange: function() {
    	this.setState(getComponentState());
  	}
});

module.exports = Rules;