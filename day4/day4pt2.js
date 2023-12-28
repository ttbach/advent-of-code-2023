const { match } = require('node:assert');
const fs = require('node:fs');
const data = fs.readFileSync('./input.txt', 'utf8');

function main() {
  let totalScratchCards = 0;
  const scratchCardPairs = data.split('\n') // [ ['Card 1: ... | ...'], ['Card 2: ... | ...'],...] ]
  .map(line => line.split(': ')[1]) // [ ['... | ...'], ['... | ...'], ... ]
  .map(cardPairs => cardPairs.split(' | ')) // [ [[' 1 12'], ['12 13']], [...] ]
  .map(numberList => numberList
    .map(list => list.split(' ') // [ ['', '1', '12'], ['12', '13'], ... ]
    .filter(numberStr => numberStr !== '') // [ [['1', '12'], ['12', '13']], [[...], [...]] ]
    .map(numberStr => parseInt(numberStr)) // [ [[1, 12], [12, 13]], [[...], [...]]]
    )
  );

  // Maps Card Number to how many winning numbers it has and number of copies
  /**
   * {
   *  Card 1: {
   *    matchCount: 4,
   *    copies: 1
   *  },
   *  Card 2: {
   *    matchCount: ...,
   *    copies: ...
   *  }
   * }
   */
  const cardInfoMap = new Map();

  scratchCardPairs.forEach((pair, index) => {
    const matchCount = _countMatches(pair[0], pair[1]);
    cardInfoMap.set(`Card ${index+1}`, { matchCount, copies: 1 });
  });
  
  for (const [cardName, propObject] of cardInfoMap.entries()) {
    const { matchCount, copies } = propObject;
    
    if (matchCount) {
      // Given C copies of a card that has M matches, add C copies to the next M cards
      _incrementCopiesOfSubsequentCards({ cardInfoMap, cardName, matchCount});
    }
    
    totalScratchCards += copies;
  };

  return totalScratchCards;
}

function _countMatches(winningNums, myNums) {
  return myNums.filter(num => winningNums.includes(num)).length;
}

function _incrementCopiesOfSubsequentCards({ cardInfoMap, cardName, matchCount}) {
  let currentCardName = cardName;
  const { copies } = cardInfoMap.get(cardName);

  while (matchCount) {
    const nextCardName = _computeNextCard(currentCardName);
    cardInfoMap.get(nextCardName).copies += copies; 
    currentCardName = nextCardName;
    matchCount--;
  }
}

function _computeNextCard(cardName) {
  const nextCardCount = parseInt(cardName.split(' ')[1]) + 1;
  return `Card ${nextCardCount}`;
}

console.log(main());