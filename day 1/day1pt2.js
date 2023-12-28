const fs = require('node:fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const arr = data.split('\n');
const digitLetterMap = {
  one: 1,
  two: 2, 
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

function main() {
  const calibrationValueArr = arr.map(value => _findNumbersPt2(value));
  const sumValues = calibrationValueArr.reduce((acc, curr) => acc + curr, 0);
  console.log(sumValues);
}

function _findNumbersPt2(input) {
  let firstNum;
  let secondNum;
  let startIndex = 0;
  let digitLetterArr = Object.keys(digitLetterMap);
  
  while (startIndex < input.length) {
    let char = input.charAt(startIndex);

    if (isNaN(char)) {
      // Check if the character matches the first letter of any letters in digitLetterArr
      const matches = _findMatchingFirstLetter(char, digitLetterArr);

      if (matches.length === 0) {
        startIndex++;
      } else {
        const matchingWord = _findMatchingWord(input.substring(startIndex), digitLetterArr);
        // If there's a match, check if the full word matches
        if (matchingWord) {
          // figure out which num variable to update
          if (!firstNum) {
            firstNum = digitLetterMap[matchingWord];
          } else {
            secondNum = digitLetterMap[matchingWord];
          }
          // update the start index to the letter after the end of the word
          startIndex++;
        } else {
          startIndex++;
        }
      }
    } else {
      if (!firstNum) {
        firstNum = parseInt(char);
      } else {
        secondNum = parseInt(char);
      }
      startIndex++;
    }
  }

  if (!secondNum) {
    secondNum = firstNum;
  }
  
  return (firstNum * 10) + secondNum;
}

function _findMatchingFirstLetter(letter, wordArr) {
  let matches = wordArr.filter(word => {
    if (word.charAt(0) === letter) {
      return word;
    }
  });
  return matches;
}

function _findMatchingWord(givenWord, matchingWordArr) {
  let matchingWord = '';

  matchingWordArr.forEach(word => {
    let length = word.length;
    let lettersInFirstWord = givenWord.substring(0, length);
    
    if (lettersInFirstWord === word) {
      matchingWord = word;
    }
  })

  return matchingWord;
}

main();
