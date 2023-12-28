const fs = require('node:fs');
const data = fs.readFileSync('./input.txt', 'utf8');

function main() {
  let sum = 0;
  const scratchCardPairs = data.split('\n') // [ ['Card 1: ... | ...'], ['Card 2: ... | ...'],...] ]
  .map(line => line.split(': ')[1]) // [ ['... | ...'], ['... | ...'], ... ]
  .map(cardPairs => cardPairs.split(' | ')) // [ [[' 1 12'], ['12 13']], [...] ]
  .map(numberList => numberList
    .map(list => list.split(' ') // [ ['', '1', '12'], ['12', '13'], ... ]
    .filter(numberStr => numberStr !== '') // [ [['1', '12'], ['12', '13']], [[...], [...]] ]
    .map(numberStr => parseInt(numberStr)) // [ [[1, 12], [12, 13]], [[...], [...]]]
    )
  );
  const cardValues = _computeCardValue(scratchCardPairs[0][1].length);
  scratchCardPairs.forEach(pair => sum+= cardValues[_countMatches(pair[0], pair[1])]);
  
  return sum;
}

function _computeCardValue(length) {
  return Array.from({ length }, (el, index) => {
    if (index === 0) return 0;
    else if (index === 1) return 1;
    return Math.pow(2, index-1);
  })
}

function _countMatches(winningNums, myNums) {
  return myNums.filter(num => winningNums.includes(num)).length;
}

console.log(main());