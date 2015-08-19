var Draggable = require('react-draggable');
var CardStore = require('../CardStore');
var ReactAnimate = React.addons.CSSTransitionGroup;

//Stack rendered under each card as soon one or more card is stacked on top of each other
var CardStack = React.createClass({
	render: function() {
		return (
			<div className="stack"></div>
		);
	}
})

var TableCard = React.createClass({
  onStop: function(event, ui) {
  	ui.node.style.boxShadow = "0 0";
  	this.props.onDrop(ui.position.left, this.props.suit, this.props.number, this.props.stacks);
  },
  onDrag: function(event, ui){
  	event.preventDefault();
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
  componentDidMount: function(){
  	//Hack to make the component re-render after animation is done
  	var that = this;
  	setTimeout(function(){
  		that.setState({
  			mounted: true
  		});
  	}, 600);
  },
  getInitialState: function(){
  	return {
  		mounted: false
  	};
  },
	render: function() {
		var drags = {onStop: this.onStop, onDrag: this.onDrag};
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
		
		//Animation when drawing card
		if(CardStore.getConsecutiveCardMoves() === 0 && this.props.index + 1 === CardStore.getCardStackCount() && !this.state.mounted){
			var animationEnter;
			var screenWidth = document.getElementById('content').scrollWidth;
			var stacksOnTable = CardStore.getCardStackCount();
			var dunno = screenWidth / stacksOnTable;
			if(dunno > 290){
				animationEnter = 'flipper left';
			}else if(dunno < 290 && dunno > 190){
				animationEnter = 'flipper center';
			}else{
				animationEnter = 'flipper right';
			}
			return (
				<Draggable
          zIndex={100}
          start={{x: 0, y: 0}}
          moveOnStartChange={true}
          bounds={{left: -600, right: 0}}
          {...drags}>
          <span>
						<ReactAnimate transitionName="example" transitionAppear={true} component="div" className="flip-container">
              <span className={style}>
                <div className={animationEnter}> 
              		<div className="front">
										<h1>{this.getNumberIcon()} {this.getSuitIcon()}</h1>
									</div>
									<div className="back"></div>
                </div>
              </span>
            </ReactAnimate>
          </span>
        </Draggable>
			)
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