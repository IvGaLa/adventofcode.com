/*
--- Day 6: Trash Compactor ---
After helping the Elves in the kitchen, you were taking a break and helping them re-enact a movie scene when you over-enthusiastically jumped into the garbage chute!

A brief fall later, you find yourself in a garbage smasher. Unfortunately, the door's been magnetically sealed.

As you try to find a way out, you are approached by a family of cephalopods! They're pretty sure they can get the door open, but it will take some time. While you wait, they're curious if you can help the youngest cephalopod with her math homework.

Cephalopod math doesn't look that different from normal math. The math worksheet (your puzzle input) consists of a list of problems; each problem has a group of numbers that need to be either added (+) or multiplied (*) together.

However, the problems are arranged a little strangely; they seem to be presented next to each other in a very long horizontal list. For example:

123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
Each problem's numbers are arranged vertically; at the bottom of the problem is the symbol for the operation that needs to be performed. Problems are separated by a full column of only spaces. The left/right alignment of numbers within each problem can be ignored.

So, this worksheet contains four problems:

123 * 45 * 6 = 33210
328 + 64 + 98 = 490
51 * 387 * 215 = 4243455
64 + 23 + 314 = 401
To check their work, cephalopod students are given the grand total of adding together all of the answers to the individual problems. In this worksheet, the grand total is 33210 + 490 + 4243455 + 401 = 4277556.

Of course, the actual worksheet is much wider. You'll need to make sure to unroll it completely so that you can read the problems clearly.

Solve the problems on the math worksheet. What is the grand total found by adding together all of the answers to the individual problems?


--- Part Two ---
The big cephalopods come back to check on how things are going. When they see that your grand total doesn't match the one expected by the worksheet, they realize they forgot to explain how to read cephalopod math.

Cephalopod math is written right-to-left in columns. Each number is given in its own column, with the most significant digit at the top and the least significant digit at the bottom. (Problems are still separated with a column consisting only of spaces, and the symbol at the bottom of the problem is still the operator to use.)

Here's the example worksheet again:

123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
Reading the problems right-to-left one column at a time, the problems are now quite different:

The rightmost problem is 4 + 431 + 623 = 1058
The second problem from the right is 175 * 581 * 32 = 3253600
The third problem from the right is 8 + 248 + 369 = 625
Finally, the leftmost problem is 356 * 24 * 1 = 8544
Now, the grand total is 1058 + 3253600 + 625 + 8544 = 3263827.

Solve the problems on the math worksheet again. What is the grand total found by adding together all of the answers to the individual problems?

*/

import { _readInput } from '../../lib.js';

const getNumbers = (fileInput) => {
  const data = _readInput(fileInput);

  const operators = [...data.at(-1)].filter((ch) => ch.trim() !== '');

  const numbers = data
    .slice(0, -1)
    .map((line) => line.trim().split(/\s+/).map(Number));

  return [numbers, operators];
};

const operations = {
  '*': (a, b) => a * b,
  '+': (a, b) => a + b,
};

const day06 = ([numbers, operators]) => {
  let count = 0;

  for (let o = 0; o < operators.length; o++)
    count += numbers
      .map((row) => row[o])
      .reduce((acc, n) => operations[operators[o]](acc, n));

  return count;
};

// --------------------------------------------------------

// Using IA (VScode Chat Agent)
const day06Two = (fileInput) => {
  // Read raw input preserving spaces
  const raw = _readInput(fileInput);
  if (raw.at(-1) === '') raw.pop();

  const dataLines = raw;

  // Pad lines to same width
  const height = dataLines.length;
  const width = Math.max(...dataLines.map((l) => l.length));
  const lines = dataLines.map((l) => l.padEnd(width, ' '));

  const opLine = lines[height - 1];

  // Determine separator columns (all rows are spaces)
  const isSep = Array.from({ length: width }, (_, c) => {
    for (let r = 0; r < height; r++) if (lines[r][c] !== ' ') return false;
    return true;
  });

  let subcount = 0;

  // Scan columns right-to-left grouping contiguous non-separator columns into problems
  for (let c = width - 1; c >= 0; ) {
    if (isSep[c]) {
      c -= 1;
      continue;
    }

    // collect columns for this problem (right-to-left order)
    const group = [];
    while (c >= 0 && !isSep[c]) {
      group.push(c);
      c -= 1;
    }

    // For this problem, build numbers from each column (top-to-bottom)
    const nums = [];
    for (const col of group) {
      let colChars = '';
      for (let r = 0; r < height - 1; r++) colChars += lines[r][col] ?? ' ';
      const digits = colChars.replace(/\s+/g, '');
      if (digits.length > 0) nums.push(Number(digits));
    }

    // find operator for this problem somewhere in the group's columns
    let op = null;
    for (const col of group) {
      const ch = opLine[col];
      if (ch && ch.trim() !== '') {
        op = ch;
        break;
      }
    }

    if (!op) continue;

    subcount += nums.reduce((a, b) => operations[op](a, b));
  }

  return subcount;
};

//const fileInput = './2025/day06/example.txt'; // 4277556 - 3263827
const fileInput = './2025/day06/input.txt'; // 6891729672676 - 9770311947567

console.log(day06(getNumbers(fileInput)));
console.log(day06Two(fileInput));
