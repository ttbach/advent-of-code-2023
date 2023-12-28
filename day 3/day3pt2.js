const fs = require('node:fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const arr = data.split('\n').map(line => line.split(''));
const arrCopy = arr.map(function(innerArray) {
  return innerArray.slice();
});

function main() {
  let sum = 0;

  // Iterate through each cell 
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[0].length; col++) {
      const currCell = arr[row][col];
      // If there's a symbol found, check top, down, left right, diagonal top left, diagonal top right, diagonal bottom left, diagonal bottom right
      if (_isASymbol(currCell)) {
        const directionCoords = [
          [row-1, col-1], // top left
          [row-1, col], // top
          [row-1, col+1], // top right
          [row, col-1], // left
          [row, col+1], // right
          [row+1, col-1], // bottom left
          [row+1, col], // bottom
          [row+1, col+1] // bottom right
        ];

        // Passing the arrCopy here because we don't want to double count cells of the 
        // same number as we're looking for cells that have a digit
        const matches =_matchingAdjacentCells(directionCoords, arrCopy);
        if (matches.length === 2) {
          const [row1, col1] = matches[0];
          const [row2, col2] = matches[1];
          sum += _findNumber(row1, col1, arr) * _findNumber(row2, col2, arr);
        }
      }
    }
  }
  
  return sum;
}

function _isASymbol(char) {
  return char !== '.' && isNaN(parseInt(char));
}

// Checking if char is a number. This adds a check for 0, so it will return truthy for that too
function _isANumber(char) {
  return !!parseInt(char) || char === '0';
}

function _isValid(row, col, grid) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && _isANumber(grid[row][col]);
}

// Finds the number and marks them off as visited
function _findNumber(row, col, grid) {
  let numberStr = grid[row][col].toString();
  let left = col - 1;
  let right = col + 1;
  
  // Mark current cell as visited
  grid[row][col] = '.';
  
  // If there's a number in that cell, figure out the rest of the number by going left and right, marking off the numbers as '.' as you explore
  while (left >= 0 && _isANumber(grid[row][left])) {
    numberStr = grid[row][left] + numberStr;
    grid[row][left] = '.';
    left--;
  }

  while (right < grid[0].length && _isANumber(grid[row][right])) {
    numberStr = numberStr + grid[row][right]
    grid[row][right] = '.';
    right++;
  }
  
  return parseInt(numberStr) || 1; // returning 1 for cases where NaN is returned, so you don't multiple by NaN when the product is computed
}

function _matchingAdjacentCells(directionCoords, grid) {
  return directionCoords.filter(([row, col]) => {
    const isValid = _isValid(row, col, grid);

    if (isValid) {
      _findNumber(row, col, grid);
    }

    return isValid;
  });
}

console.log(main());
