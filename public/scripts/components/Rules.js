var Rules = React.createClass({
	handleClick: function(){
		var closed = this.state.closed;
		closed = !closed;
		this.setState({
			closed: closed
		});
	},
	getInitialState: function(){
		return {
			closed: true
		};
	},
	render: function(){
		var icon = this.state.closed ? "+" : "-";
		var text = this.state.closed ? "" : "Draw a card by pressing the card stack at the bottom. Move a card over another card with the same suit(♠, ♦, ♥, ♣) or same value. You can only move the card one position to the left or three positions to the left. Your goal is to get as few stacks as possible after all cards are drawn."
		return (
			<div className="rules">
				<h2 onClick={this.handleClick}>Rules {icon}</h2>
				<div>{text}</div>
			</div>
		);
	}
});

module.exports = Rules;