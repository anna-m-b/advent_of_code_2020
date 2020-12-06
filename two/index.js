const fs = require('fs');

const strings = fs.readFileSync(`${__dirname}/passwords.txt`).toString().split('\n');

const cleanStrings  = strings.map(string => string.replace(/-/g, " ").replace(/:/g, "").split(/\s/g))

const passwordObjs = cleanStrings.map(subarray => {
   let obj = {};
   subarray.map((value, index) => {
     
      if (index === 0) {
         obj.min = Number(value);
      }
      if (index === 1) {
         obj.max = Number(value);
      }
      if (index === 2) {
        obj.letter = value;
      }
      if (index === 3) {
         obj.password = value;
      }
   })
   return obj;
});


const  validPasswords = passwordObjs.filter(obj => {
   let regex = new RegExp(`${obj.letter}`, 'g')
   let count = (obj.password.match(regex) || []).length;
   return !(count < obj.min || count > obj.max)
   });

console.log(passwordObjs.length)
console.log(validPasswords.length)

const numberOfValidPasswords = passwordObjs.reduce((total, obj) => {
   let regex = new RegExp(`${obj.letter}`, 'g');
   let count = (obj.password.match(regex) || []).length;
   if (!(count < obj.min || count > obj.max)) { 
      total++;
    }
   return total;
}, 0);


// PART 2


const numberOfActuallyValidPasswords = passwordObjs.reduce((total, obj) => {
   const position1 = obj.min - 1;
   const position2 = obj.max - 1;
   const { password, letter } = obj;
   if ((password.charAt(position1) === letter || password.charAt(position2) === letter) 
        && (!(password.charAt(position1) === letter && password.charAt(position2) === letter))) {
           total++
        }
  return total;
}, 0)



 console.log(numberOfActuallyValidPasswords)