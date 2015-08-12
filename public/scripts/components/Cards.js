var Draggable = require('react-draggable');

var CardStack = React.createClass({
	render: function() {
		return (
			<div className="stack"></div>
		);
	}
})

var TableCard = React.createClass({
    onStop: function(event, ui) {
    	this.props.onDrop(ui.position.left, this.props.suit, this.props.number, this.props.stacks);
    },
    getSuitIcon: function(){
		var suitIcon;
		var suit = this.props.suit;
		switch(suit){
			case "Clubs":
				suitIcon = '♣';
				break;
			case "Diamonds":
				suitIcon = '♦'
				break;
			case "Hearts":
				suitIcon = '♥';
				break;
			case "Spades":
				suitIcon = '♠';
				break;
			default:
				suitIcon = '?';
		}
		return suitIcon;
    },
    getNumberIcon: function(){
		var number = this.props.number;
		var numberIcon;
		switch(number){
			case 11:
				numberIcon = "J";
				break;
			case 12:
				numberIcon = "Q";
				break;
			case 13:
				numberIcon = "K";
				break;
			case 14: 
				numberIcon = "A";
				break;
			default:
				numberIcon = number;
		}
		return numberIcon;
    },
    
	render: function() {
		var drags = {onStop: this.onStop};
		var style = 'table-card box ' + this.props.suit + " " + this.props.number;
		var stacks = [];
		for(var i = 0; i < this.props.stacks; i++){
			stacks.push(<CardStack key={i}/>);
		}
		var stackStyle;
		if(stacks.length > 0){
			stackStyle = {
				bottom: "-" + ((stacks.length*2) + 1) + "px"
			};
		}else{
			stackStyle = {
				bottom: "0px"
			};
		}
		
		return (
			<Draggable
                zIndex={100}
                start={{x: 0, y: 0}}
                moveOnStartChange={true}
                bounds={{left: -600, right: 0}}
                {...drags}>
                <span className={style}>
					<div>
						<h1>{this.getNumberIcon()} {this.getSuitIcon()}</h1>
					</div>
					<div className="stacks" style={stackStyle}>
						{stacks}
					</div>
                </span>
            </Draggable>
		);
	}
});

module.exports.TableCard = TableCard;