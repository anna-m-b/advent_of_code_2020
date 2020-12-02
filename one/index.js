const fs = require('fs');

const expenses = fs.readFileSync(`${__dirname}/expenses.txt`).toString().split('\n').map(string => Number(string));

let a, b;

for (let i = 0; i < expenses.length; i++) {
   for (let j = 1; j < expenses.length; j++) {
      if (expenses[i] + expenses[j] === 2020) {
         a = expenses[i];
         b = expenses[j];
      }
   }
}

console.log(a * b)

      
