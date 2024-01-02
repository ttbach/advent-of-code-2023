const fs = require('node:fs');
const data = fs.readFileSync('./input.txt', 'utf8');

function main() {
  const { seedList, almanacMap } = _processData(data);  
  let smallestLocSoFar = Number.MAX_VALUE;

  seedList.forEach(seed => {
    smallestLocSoFar = Math.min(smallestLocSoFar, _findLocationNumFromSeedNum(seed, almanacMap));
  })

  return smallestLocSoFar;
}

function _processData(data) {
  let seedList = [];
  const almanacMap = {
    'soil-to-fertilizer map': [],
    'seed-to-soil map': [],
    'fertilizer-to-water map': [],
    'water-to-light map': [],
    'light-to-temperature map': [],
    'temperature-to-humidity map': [],
    'humidity-to-location map': [],
  };

  let mapCategory = '';

  data.split('\n').forEach(line => {
    /**
     * if the line contains a ':':
     *  if the line contains 'seeds', split line by colon, split the 2nd part by " ", convert each el to numbers, and put them in the seedList
     *  else, based on the name (e.g. 'soil-to-fertilizer', populate the coresponding fields in the almanacMap with source, destination, and range) 
     * */ 
    if (line.includes(':')) {
      if (line.includes('seeds: ')) {
        seedList = line.split(': ')[1].split(' ').map(numStr => parseInt(numStr));
      }
      else {
        // If the line is a map category (e.g. 'soil-to-fertilizer map:'), then set the mapCategory to that name
        mapCategory = line.split(':')[0];
      }
    } 
    // If it's an empty line or number line
    else {
      // If it's an empty line, reset the mapCategory
      if (line.length === 0) mapCategory = '';
      else {
        // If it's a number line, populate the coresponding mapCategory in the almanacMap with source, destination, and range) 
        const almanacCategoryArr = almanacMap[mapCategory];
        let sourceDestRangeMap = {
          destination: 0,
          source: 0,
          range: 0
        };

        line.split(' ').forEach((numStr, index) => {
          if (index === 0) sourceDestRangeMap.destination = parseInt(numStr);
          else if (index === 1) sourceDestRangeMap.source = parseInt(numStr);
          else sourceDestRangeMap.range = parseInt(numStr);
        });

        almanacCategoryArr.push(sourceDestRangeMap);
      }
    }
  });

  return { seedList, almanacMap };
}

function _findLocationNumFromSeedNum(seedNum, almanacMap) {
  const soilNum = _findDestinationNumber(seedNum, almanacMap['seed-to-soil map']);
  const fertilizerNum = _findDestinationNumber(soilNum, almanacMap['soil-to-fertilizer map']);
  const waterNum = _findDestinationNumber(fertilizerNum, almanacMap['fertilizer-to-water map']);
  const lightNum = _findDestinationNumber(waterNum, almanacMap['water-to-light map']);
  const tempNum = _findDestinationNumber(lightNum, almanacMap['light-to-temperature map']);
  const humidityNum = _findDestinationNumber(tempNum, almanacMap['temperature-to-humidity map']);
  const locationNum = _findDestinationNumber(humidityNum, almanacMap['humidity-to-location map']);

  return locationNum;
}

function _findDestinationNumber(number, almanacCategoryArr) {
  // iterate through each object in the arr
  for (let index = 0; index < almanacCategoryArr.length; index++) {
    const { source, destination, range } = almanacCategoryArr[index];
    // if the number is within the range, find the corresponding destination number and return it
    if (number >= source && number <= source + range) {
      const diff = number - source;
      return destination + diff;
    }
  };
  // if the number is not in the range, return the same number you're given for destination
  return number;
}

console.log(main());
