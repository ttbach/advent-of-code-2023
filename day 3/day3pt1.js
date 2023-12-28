const fs = require('node:fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const arr = data.split('\n').map(line => line.split(''));

function main() {
  let sum = 0;

  // Iterate through each cell 
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[0].length; col++) {
      const currCell = arr[row][col];
      // If there's a symbol found, check top, down, left right, diagonal top left, diagonal top right, diagonal bottom left, diagonal bottom right
      if (_isASymbol(arr[row][col])) {
        // Top Left
        if (_isValid(row-1, col-1, arr)) {
          sum += _findNumber(row-1, col-1, arr);
        }
        // Top
        if (_isValid(row-1, col, arr)) {
          sum += _findNumber(row-1, col, arr);
        }
        // Top right
        if (_isValid(row-1, col+1, arr)) {
          sum += _findNumber(row-1, col+1, arr);
        }
        // Left
        if (_isValid(row, col-1, arr)) {
          sum += _findNumber(row, col-1, arr);
        }
        // Right
        if (_isValid(row, col+1, arr)) {
          sum += _findNumber(row, col+1, arr);
        }
        // Bottom Left
        if (_isValid(row+1, col-1, arr)) {
          sum += _findNumber(row+1, col-1, arr);
        }
        // Bottom
        if (_isValid(row+1, col, arr)) {
          sum += _findNumber(row+1, col, arr);
        }
        // Bottom Right
        if (_isValid(row+1, col+1, arr)) {
          sum += _findNumber(row+1, col+1, arr);
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
  
  return parseInt(numberStr);
}

console.log(main());
