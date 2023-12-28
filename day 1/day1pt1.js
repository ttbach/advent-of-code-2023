const fs = require('node:fs');

function main() {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const arr = data.split('\n');
  const calibrationValueArr = arr.map(value => _findNumbersPt1(value));
  const sumValues = calibrationValueArr.reduce((acc, curr) => acc + curr, 0);
  console.log(sumValues);
}

function _findNumbersPt1(input) {
  let firstNum;
  let secondNum;
  Array.from(input).forEach(char => {
    if (!isNaN(parseInt(char))) {
      if (!firstNum) {
        firstNum = parseInt(char);
      } else {
        secondNum = parseInt(char);
      }
    }
  })

  if (!secondNum) {
    secondNum = firstNum;
  }
  
  return (firstNum * 10) + secondNum;
}

main();