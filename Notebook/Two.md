# Day 2 Part 1

### Task

[From the Advent of Code website](https://adventofcode.com/2020/day/2):

>Suppose you have the following list:
>
```
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
```
>
>Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.
>
>In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.
>
>How many passwords are valid according to their policies?
***
<br> 

### 1. Get the data accessible and iterable.
<br>

My passwords text file is 1000 lines of this:

```
6-7 z: dqzzzjbzz
13-16 j: jjjvjmjjkjjjjjjj
5-6 m: mmbmmlvmbmmgmmf
```

I want it it to look something like this:

```
{ min: 6, max: 7, letter: 'z', password: 'dqzzzjbzz' },
{ min 13, max: 16, letter: 'j', password: 'jjjvjmjjkjjjjjjj'}
...
```

So I can do something like:
```
count the instances of letter in password
if the count is less than the minimum, return false
if the count is more then the maximum, return false
otherwise return true and add to total count of valid passwords
```

First, let's use fs to read the text file and turn it into an array of strings:

``` 
const strings = fs.readFileSync(`${__dirname}/passwords.txt`).toString().split('\n');
```

Now, we need to delete some parts of each string to get closer to the target object structure: the hyphen between the 2 numbers and the colon after the target letter. I'd also like to make each string into its own array of elements so as to be iterable later. 

```
const cleanStrings  = strings.map(string => string.replace(/-/g, " ").replace(/:/g, "").split(/\s/g))
```

In the above snippet we take each string, find any '-' and replace them with a space " ". Then we find any ':' and replace them with nothing "". Finally we turn the string into an array, separating the string into elements according to whitespace.

``` 
6-7 z: dqzzzjbzz
```

becomes:

```
[ '6', '7', 'z', 'dqzzzjbzz' ]
```

The next step is to turn all those subarrays of strings into objects with key value pairs that we can reference & do some operations on. One solution is to map over the cleaned strings array and create a new object for each subarray. To give the object content, we can map over the subarray and grab its index numbers to set property values on the object how we want them:

```
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
```

This changes all the subarrays into objects:

```
[
  { min: 6, max: 7, letter: 'z', password: 'dqzzzjbzz' },
  { min: 13, max: 16, letter: 'j', password: 'jjjvjmjjkjjjjjjj' },
  ...
]
```

Looks like we are ready to find how many passwords are valid!

I know it should be possible to use reduce, as we want to get one value from an array, but I'm more comfortable with filter so I'll use that first then once I've got it all working, try refactoring it using reduce.

Filter takes a function that acts as a test: if the array element passes the test, it makes it into the new array. So what's the test we need to get valid passwords? 

Passwords are valid if the target letter appears in the password no fewer times than the given minimum and no more times than the given maximum. I think I will need a regex again, to find out how many times the letter appears in the string.

First I try:

```
let regex = /${obj.letter}/g;
```

But this doesn't work. I'm trying to use the syntax for putting a variable in a template string, but a regex isn't a string, it's a regex, which according to node is an object:

```
> let regex = new RegExp('test', 'g')
 // undefined
> regex
// /test/g
> typeof regex
// 'object'
```

So definitely not a string. I briefly fear I'm barking up the wrong tree, but A quick google brings me to the RegExp constructor, which can take variables. Phew! I can make the regex like so:
```
let regex = new RegExp(`${obj.letter}`, 'g')
```

The first argument is a string of the pattern you want to make a regex out of, and the second is for flags, in this case 'g' for global, which means it won't stop at the first match and will search the whole string. Another common flag is  'i' for case insensitive, but as I know all the passwords as in lowercase I leave it out.

So how do we use this to count the instances of the given letter? String method .match() returns an array of all the matches, so we can get this then check its length. So now we have 2 statements of our test function:

```
let regex = new RegExp(`${obj.letter}`, 'g');
let count = (obj.password.match(regex) || []).length;
```

The reason we say 'or empty array' in the count declaration is that if match finds 0 matches, it will return `null`, not an array. And `null` doesn't have a length property, so it will break our code if there are any passwords that contain 0 instances of the target letter.

The last thing our test funciton needs is to check the count is not smaller or greater than the minimum and maximum respectively. All put together it looks like this:

```
const  validPasswords = passwordObjs.filter(obj => {
   let regex = new RegExp(`${obj.letter}`, 'g')
   let count = (obj.password.match(regex) || []).length;
   return !(count < obj.min || count > obj.max)
   });

```

The last thing to do is log out the validPasswords length, plug it into the Advent of Code website and see if it passes....  

It does! Happy days.
<br>

One last last thing...

Change that filter into a reduce. 

Reduce takes an 'accumulator' which will keep count of the valid passwords, and returns the value of the accumulator upon completion. This seems like a more fitting method to use as all we want is the number rather than the password objects themselves. 

Using the same logic as above, we can write a reduce methods like this:

```
const numberOfValidPasswords = passwordObjs.reduce((total, obj) => {
   let regex = new RegExp(`${obj.letter}`, 'g');
   let count = (obj.password.match(regex) || []).length;
   if (!(count < obj.min || count > obj.max)) { 
      total++;
    }
   return total;
}, 0);
```

There are a couple of differences: in filter, we returned a boolean to determine whether the current object would pass into the new array or not. Here we need to add 1 to our total. 

We also tell reduce that the initial value is 0, because otherwise it will try to assign the first object in the array to the accumulator (in this case named 'total') which will produce an error because an object is not a number.

To test it's all working, log out `numberOfValidPasswords` and check it's the same result as the one we already know is correct. It is! Hooray! 

## Part 2

>The shopkeeper suddenly realizes that he just accidentally explained the password policy rules from his old job at the sled rental place down the street! The Official Toboggan Corporate Policy actually works a little differently.
>
>Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.
>
>Given the same example list from above:
>
>1-3 a: abcde is valid: position 1 contains a and position 3 does not.
>1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
>2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.
>How many passwords are valid according to the new interpretation of the policies?

Oh no! Silly shopkeeper. If it wasn't the for the shiny gold star on my advent of code, I'd feel I'd just wasted the past hour or two.

This new policy sounds like it could do with using charAt. Like arrays, the characters of strings have index numbers. And we can use the charAt method to check which character is at which index.

We can use reduce again, so my first attempt looks like this:

```
 const numberOfActuallyValidPasswords = passwordObjs.reduce((total, obj) => {
    if ((obj.password.charAt(obj.min) === obj.letter || obj.password.charAt(obj.max) === obj.letter) 
         && (!(obj.password.charAt(obj.min) === obj.letter && obj.password.charAt(obj.max) === obj.letter))) {
            total++
         }
   return total;

}, 0)
```

I get a result, enter it into AoC... but it's wrong.

Hmm...

Oh wait, remember this from the instructions? "Be careful; Toboggan Corporate Policies have no concept of "index zero"!"

Our obj.min and max values are 1 too high. Let's minus 1 from them. This result works! Yay, day 2 done! (and only 4 days late)

Before calling it a day though let's refactor that last function to remove some of the repetition and have more accurate names:

```
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
 ```

 
 Phew, 2 days done! I'm sure there are more efficient, cleaner ways of solving these puzzles, but for now, I'm just happy I could find a solution for each one without too much Googling.

 :) 

