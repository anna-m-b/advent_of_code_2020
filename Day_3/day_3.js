const fs = require('fs');

const arrayOfStrings = fs.readFileSync(`${__dirname}/input.txt`).toString().split('\n');

const arraysOfPoints =  arrayOfStrings.map(string => string.split(""))


function checkTreesOne(numOfStepsRight) {
   let position = 0;
   let index = 0;
      const result = arraysOfPoints.reduce((total, arr) => {
         if (arr[index] === '#') {
            total++
         }
         position += numOfStepsRight;
         index = position % arr.length;
         return total;
      }, 0);
   return result;
}

function checkTreesTwo() {
   let position = 0;
   let index = 0;
      const result = arraysOfPoints.reduce((total, arr, topIndex) => {
         if ((topIndex % 2 === 0) && (arr[index] === '#')) {
            total++
         } 
         if (topIndex % 2 === 0) {
            position += 1;
            index = position % arr.length;
         }
         return total;
      }, 0);
   return result;
}


const result = checkTreesOne(1) * checkTreesOne(3) * checkTreesOne(5) * checkTreesOne(7) * checkTreesTwo()

console.log(result)
