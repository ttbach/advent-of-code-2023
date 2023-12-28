const fs = require('node:fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const arr = data.split('\n');
const colorMap = {
  red: 12,
  green: 13,
  blue: 14 
};

function main() {
  let sum = 0;
  
  const gamesArr = arr
    .map(game => game.split(': ')[1])
    .map(time => time.split('; '))
    .map(time => time.map(hand => 
      hand.split(', ')
        .map(cube => cube.split(' ')
      )
    )
  );
  
  // Iterate through each game
  for (let gameIndex = 0; gameIndex < gamesArr.length; gameIndex++) {
    let gameIsValid = true;
    
    // Iterate through each time
    for (let timeIndex = 0; timeIndex < gamesArr[gameIndex].length; timeIndex++) {
      if (!gameIsValid) {
        break;
      }

      // Iterate through each cube color
      for (let cubeIndex = 0; cubeIndex < gamesArr[gameIndex][timeIndex].length; cubeIndex++) {
        const [count, color] = gamesArr[gameIndex][timeIndex][cubeIndex];
        
        // If the cube exceeds the limit of that color, skip through this time.
        if (count > colorMap[color]) {
          gameIsValid = false;
          break;
        }
      }
    }

    if (gameIsValid) {
      sum += gameIndex + 1;
    }
  }
  
  return sum;
}

console.log(main());