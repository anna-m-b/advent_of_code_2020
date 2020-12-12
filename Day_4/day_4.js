const fs = require('fs')
const { log } = console;

const passportString = fs.readFileSync(`${__dirname}/passports.txt`).toString().split(/\n\n/);


const stringyPassports = passportString.map(elem => elem.split(/\s/g));
// log(stringyPassports)

const passports = stringyPassports.map(elem => {
   const passportObj = {};
   elem.map(string => {
      const objKey = string.match(/(.*):/)[1]  
      const value = string.match(/:(.*)/)[1]
      passportObj[objKey] = value
   })
   return passportObj
})

log(passports[0])


const result = passports.reduce((total, passport) => {

   if (passport.ecl && passport.pid && passport.eyr && passport.hcl && passport.byr && passport.iyr && passport.hgt) {
      total++
      
   }
   return total
}, 0)

log(result)
