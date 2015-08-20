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
});

var TableCard = React.createClass({
  onStop: function(event, ui) {
  	this.props.onDrop(ui.position.left, this.props.suit, this.props.number, this.props.stacks);
  },
  onDrag: function(event, ui){
  	event.preventDefault();
  },
  getSuitIcon: function(){
		switch(this.props.suit){
			case "Clubs": return '♣';
			case "Diamonds": return '♦';
			case "Hearts": return '♥';
			case "Spades": return '♠';
			default: return '?';
		}
  },
  getNumberIcon: function(){
		switch(this.props.number){
			case 11: return 'J';
			case 12: return 'Q';
			case 13: return 'K';
			case 14: return 'A';
			default: return this.props.number;
		}
  },
  componentDidMount: function(){
  	//Hack to make the component re-render after animation is done
  	setTimeout(() => this.setState({mounted: true}), 700);
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
		var stackStyle = stacks.length > 0 ? { bottom: "-" + ((stacks.length*2) + 1) + "px" } : { bottom: "0px"};
		
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
			);
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