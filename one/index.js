const fs = require('fs');

const expenses = fs.readFileSync(`${__dirname}/expenses.txt`).toString().split('\n').map(string => Number(string));



function findTwoValuesWithProduct2020(array) {
   let a, b;

   for (let i = 0; i < array.length; i++) {
      for (let j = 1; j < array.length; j++) {
         if (array[i] + array[j] === 2020) {
            a = array[i];
            b = array[j];
         }
      }
   }
   return a * b;
}
// Is it possible to reduce? 

// const resultOne = findTwoValuesWithProduct2020(expenses);

// console.log(resultOne);


function findTHREEValuesWithProduct2020(array) {
let a, b, c;
   for (let i = 0; i < array.length; i++) {
      for (let j = 1; j < array.length; j++) {
         for (let k = 2; k < array.length; k++) {
            if (array[i] + array[j] + array[k] === 2020) {
               a = array[i];
               b = array[j];
               c = array[k];
            }
         }
      }
   }
   return a * b * c;
}

const resultTwo = findTHREEValuesWithProduct2020(expenses);

console.log(resultTwo);