const fs = require('node:fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const arr = data.split('\n');

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
    let maxColorCountMap = {
      red: 0,
      green: 0,
      blue: 0
    };
    let powerOfSet = 1;
    
    // Iterate through each time
    for (let timeIndex = 0; timeIndex < gamesArr[gameIndex].length; timeIndex++) {
      // Iterate through each cube color
      for (let cubeIndex = 0; cubeIndex < gamesArr[gameIndex][timeIndex].length; cubeIndex++) {
        const [count, color] = gamesArr[gameIndex][timeIndex][cubeIndex];
        maxColorCountMap[color] = Math.max(count, maxColorCountMap[color]); 
      }
    }

    // Multiply all the counts for the cubes
    powerOfSet = Object.values(maxColorCountMap).reduce((acc, currVal) => acc * currVal, 1);

    // Add it to the overall sum across different games
    sum += powerOfSet;
  }
  
  return sum;
}

console.log(main());