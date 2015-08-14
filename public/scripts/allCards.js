var allCards = ["Spades", "Hearts", "Clubs", "Diamonds"].reduce(function (acc, current) {
  var cards = [];
  for(var i = 2; i < 4; ++i) {
    cards = cards.concat({
      suit: current,
      number: i,
      stacks: 0
    });
  }
  return acc.concat(cards);
}, []);

exports.getAll = function(){
	return allCards;
}
