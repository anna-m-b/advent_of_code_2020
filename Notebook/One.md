# Task - Day 1 exercise 1

The Elves in accounting just need you to fix your expense report (your puzzle input); apparently, something isn't quite adding up.

Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

For example, suppose your expense report contained the following:

1721
979
366
299
675
1456
In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.

Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?

[From the Advent of Code website](https://adventofcode.com/2020/day/1)

I decide to tackle the problem with the following steps: <br>
- [] convert text file of numbers into an array of numbers
- [] use 2 for loops to add each number to every other number
- [] for each sum, check if it equals 2020
- [] return the values of the 2 numbers that do
- [] console log their multiplication (I just need the result to submit to the advent of code website)

1. Turn that text file into an array. 
      I contemplate doing it manually before deciding that, while possible, it's definitely not the programming way to do it. Then I remembered! A while back, a couple of friends and I had a go at doing some katas together. One involved a text file, and we turned it into an array (one of these friends is a gen-yoo-ine, bonafide CS-grad professional software developer - very helpful). I crack open the folder and find the answer I need in our kata code: [the Node.js fs module](https://nodejs.dev/learn/the-nodejs-fs-module)

      I can re-use the same code: `const expenses = fs.readFileSync(`${__dirname}/expenses.txt`).toString().split('\n')`

      I log it out, and see that I've actually got an array of strings. Of course, the code above stringifies





