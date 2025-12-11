/*
--- Day 4: Printing Department ---
You ride the escalator down to the printing department. They're clearly getting ready for Christmas; they have lots of large rolls of paper everywhere, and there's even a massive printer in the corner (to handle the really big print jobs).

Decorating here will be easy: they can make their own decorations. What you really need is a way to get further into the North Pole base while the elevators are offline.

"Actually, maybe we can help with that," one of the Elves replies when you ask for help. "We're pretty sure there's a cafeteria on the other side of the back wall. If we could break through the wall, you'd be able to keep moving. It's too bad all of our forklifts are so busy moving those big rolls of paper around."

If you can optimize the work the forklifts are doing, maybe they would have time to spare to break through the wall.

The rolls of paper (@) are arranged on a large grid; the Elves even have a helpful diagram (your puzzle input) indicating where everything is located.

For example:

..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
The forklifts can only access a roll of paper if there are fewer than four rolls of paper in the eight adjacent positions. If you can figure out which rolls of paper the forklifts can access, they'll spend less time looking and more time breaking down the wall to the cafeteria.

In this example, there are 13 rolls of paper that can be accessed by a forklift (marked with x):

..xx.xx@x.
x@@.@.@.@@
@@@@@.x.@@
@.@@@@..@.
x@.@@@@.@x
.@@@@@@@.@
.@.@.@.@@@
x.@@@.@@@@
.@@@@@@@@.
x.x.@@@.x.
Consider your complete diagram of the paper roll locations. How many rolls of paper can be accessed by a forklift?


--- Part Two ---
Now, the Elves just need help accessing as much of the paper as they can.

Once a roll of paper can be accessed by a forklift, it can be removed. Once a roll of paper is removed, the forklifts might be able to access more rolls of paper, which they might also be able to remove. How many total rolls of paper could the Elves remove if they keep repeating this process?

Starting with the same example as above, here is one way you could remove as many rolls of paper as possible, using highlighted @ to indicate that a roll of paper is about to be removed, and using x to indicate that a roll of paper was just removed:

Initial state:
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.

Remove 13 rolls of paper:
..xx.xx@x.
x@@.@.@.@@
@@@@@.x.@@
@.@@@@..@.
x@.@@@@.@x
.@@@@@@@.@
.@.@.@.@@@
x.@@@.@@@@
.@@@@@@@@.
x.x.@@@.x.

Remove 12 rolls of paper:
.......x..
.@@.x.x.@x
x@@@@...@@
x.@@@@..x.
.@.@@@@.x.
.x@@@@@@.x
.x.@.@.@@@
..@@@.@@@@
.x@@@@@@@.
....@@@...

Remove 7 rolls of paper:
..........
.x@.....x.
.@@@@...xx
..@@@@....
.x.@@@@...
..@@@@@@..
...@.@.@@x
..@@@.@@@@
..x@@@@@@.
....@@@...

Remove 5 rolls of paper:
..........
..x.......
.x@@@.....
..@@@@....
...@@@@...
..x@@@@@..
...@.@.@@.
..x@@.@@@x
...@@@@@@.
....@@@...

Remove 2 rolls of paper:
..........
..........
..x@@.....
..@@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@x.
....@@@...

Remove 1 roll of paper:
..........
..........
...@@.....
..x@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
...x@.....
...@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
....x.....
...@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
..........
...x@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...
Stop once no more rolls of paper are accessible by a forklift. In this example, a total of 43 rolls of paper can be removed.

Start with your original diagram. How many rolls of paper in total can be removed by the Elves and their forklifts?

*/

/***********************************************
 ***********************************************
 * Yes, it can be optimized, but it's the AoC! *
 ***********************************************
 ***********************************************/

import { _readInput } from '../../lib.js';

const DIRECTIONS = [
  [-1, -1], // up, left
  [-1, 0], // up, center
  [-1, 1], // up, right
  [0, -1], // center, left
  [0, 1], // center, right
  [1, -1], // down, left
  [1, 0], // down, center
  [1, 1], // down, right
];

const ROLL = '@';

const getMap = (fileInput) => _readInput(fileInput).map((str) => str.split(''));

function day04(grid) {
  let count = 0;
  const gridLength = grid.length;
  for (let row = 0; row < gridLength; row++) {
    const lineLength = grid[row].length;
    for (let col = 0; col < lineLength; col++) {
      if (grid[row][col] !== ROLL) continue; // Check if actual cell is a ROLL

      let rollNum = 0;
      for (const [dirRow, dirCol] of DIRECTIONS) {
        const newRow = row + dirRow;
        const newCol = col + dirCol;
        if (
          newRow >= 0 &&
          newCol >= 0 &&
          newRow < gridLength &&
          newCol < lineLength &&
          grid[newRow][newCol] === ROLL
        )
          rollNum++;
      }

      if (rollNum < 4) count++;
    }
  }
  return count;
}

// --------------------------------------------------------

const day04Two = (grid) => {
  let count = 0;
  const gridLength = grid.length;
  for (let row = 0; row < gridLength; row++) {
    const lineLength = grid[row].length;
    for (let col = 0; col < lineLength; col++) {
      if (grid[row][col] !== ROLL) continue; // Check if actual cell is a ROLL

      let rollNum = 0;
      for (const [dirRow, dirCol] of DIRECTIONS) {
        const newRow = row + dirRow;
        const newCol = col + dirCol;
        if (
          newRow >= 0 &&
          newCol >= 0 &&
          newRow < gridLength &&
          newCol < lineLength &&
          grid[newRow][newCol] === ROLL
        )
          rollNum++;
      }

      if (rollNum < 4) {
        count++;
        grid[row][col] = '.';
        row = 0;
        col = 0;
      }
    }
  }
  return count;
};

//const fileInput = './2025/day04/example.txt'; // 13 - 43
const fileInput = './2025/day04/input.txt'; // 1478 - 9120

const grid = getMap(fileInput);

console.log(day04(grid));
console.log(day04Two(grid));
