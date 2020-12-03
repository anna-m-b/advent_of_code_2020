# Day 1 Part 1

[From the Advent of Code website](https://adventofcode.com/2020/day/1):

>The Elves in accounting just need you to fix your expense report (your puzzle input); apparently, something isn't quite adding up.
>
>Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.
>
>For example, suppose your expense report contained the following:
>
>1721
>979
>366
>299
>675
>1456
>In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = >514579, so the correct answer is 514579.
>
>Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply >them together?



I decide to tackle the problem with the following steps: <br>
- [ ] convert text file of numbers into an array of numbers
- [ ] use 2 for loops to add each number to every other number
- [ ] for each sum, check if it equals 2020
- [ ] return the values of the 2 numbers that do
- [ ] console log their multiplication (I just need the result to submit to the advent of code website)

1. Turn that text file into an array. 

      I contemplate doing it manually before deciding that, while possible, it's definitely not the programming way to do it. Then I remember! A while back, a couple of friends and I had a go at doing some katas together. One involved a text file, and we turned it into an array (one of these friends is a gen-yoo-ine, bonafide CS-grad professional software developer - very helpful). I crack open the folder and find the answer I need in our kata code: [the Node.js fs module](https://nodejs.dev/learn/the-nodejs-fs-module)

      I can re-use the same code: 
      
      `const expenses = fs.readFileSync(`${__dirname}/expenses.txt`).toString().split('\n')`

      I log it out, and see that I've actually got an array of strings. Of course, the code above stringifies the content of the text file (`toString()`), then splits each line (`'\n'`) into its own array element. So the result is something like:

      `['1234', '5467', '4326' ...etc...]`

      But we need an array of numbers. To achieve that I can add on:
      
      `.map(string => Number(string));`

      to the declaration of expenses above.

      Phew! Now I have an array of numbers.

      What next?

2. Create a for loop with another nested in it to find the two numbers with a product of 2020.

   I initially made a syntax error that threw me off a bit, which gave undefined as a a final result:

   ```
   let a, b;
   for (let i = 0; i < array.length; i++) { 
      for (let j = 1; j < array.length; j++) {
         if (i + j === 2020) {
            a = i;
            b = j;
         }
      }
   }
   console.log(a * b)
   ```

  From using looping methods such as map, I'd gotten used to accessing the value of each element directly. But of course here we need to use a reference to the array and square bracket syntax:

  ```
  if (array[i] + array[j] === 2020) {
     a = array[i]
     b = array[j]
  }
  ```

  So now I have the 2 numbers that add up to 2020 (1044 and 976) all that is left is to mutiply them and log out the result. And that's one star collected! Just 49 left to go...


  # Day 1 Part 2

Advent of Code's instructions are:

>The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.
>
>Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.
>
>In your expense report, what is the product of the three entries that sum to 2020?


Following the same logic, my first thought is triple nested loop. Let's try it.

```
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
 console.log(a * b * c);
```

   I get the result, plug it into the Advent of Code website, and it works! Success! Day one done! 

   I do wonder if there is a way to do this without using for loops, perhaps a reduce? But my time alas is not infinite so perhaps I will come back to that another day.

