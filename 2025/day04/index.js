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


*/

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
  return grid;
};

//const fileInput = './2025/day04/example.txt'; // 13 -
const fileInput = './2025/day04/input.txt'; // 1478 -

const grid = getMap(fileInput);

console.log(day04(grid));
//console.log(day04Two(grid));
