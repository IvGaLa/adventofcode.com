/*
--- Day 16: Reindeer Maze ---
It's time again for the Reindeer Olympics! This year, the big event is the Reindeer Maze, where the Reindeer compete for the lowest score.

You and The Historians arrive to search for the Chief right as the event is about to start. It wouldn't hurt to watch a little, right?

The Reindeer start on the Start Tile (marked S) facing East and need to reach the End Tile (marked E). They can move forward one tile at a time (increasing their score by 1 point), but never into a wall (#). They can also rotate clockwise or counterclockwise 90 degrees at a time (increasing their score by 1000 points).

To figure out the best place to sit, you start by grabbing a map (your puzzle input) from a nearby kiosk. For example:

###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
There are many paths through this maze, but taking any of the best paths would incur a score of only 7036. This can be achieved by taking a total of 36 steps forward and turning 90 degrees a total of 7 times:


###############
#.......#....E#
#.#.###.#.###^#
#.....#.#...#^#
#.###.#####.#^#
#.#.#.......#^#
#.#.#####.###^#
#..>>>>>>>>v#^#
###^#.#####v#^#
#>>^#.....#v#^#
#^#.#.###.#v#^#
#^....#...#v#^#
#^###.#.#.#v#^#
#S..#.....#>>^#
###############
Here's a second example:

#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################
In this maze, the best paths cost 11048 points; following one such path would look like this:

#################
#...#...#...#..E#
#.#.#.#.#.#.#.#^#
#.#.#.#...#...#^#
#.#.#.#.###.#.#^#
#>>v#.#.#.....#^#
#^#v#.#.#.#####^#
#^#v..#.#.#>>>>^#
#^#v#####.#^###.#
#^#v#..>>>>^#...#
#^#v###^#####.###
#^#v#>>^#.....#.#
#^#v#^#####.###.#
#^#v#^........#.#
#^#v#^#########.#
#S#>>^..........#
#################
Note that the path shown above includes one 90 degree turn as the very first move, rotating the Reindeer from facing East to facing North.

Analyze your map carefully. What is the lowest score a Reindeer could possibly get?


*/

import { _readInput } from '../../lib.js';

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const TURN_COST = 1000;
const STEP_COST = 1;
const WALL = '#';
const START = 'S';
const END = 'E';

const parseInput = (fileInput) => {
  const maze = _readInput(fileInput).map((row) => row.split(''));
  const rows = maze.length;
  const cols = maze[0].length;

  return [maze, rows, cols, ...getStartFinish(maze, rows, cols)];
};

const getStartFinish = (maze, rows, cols) => {
  const start = [];
  const end = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (start.length === 0 || end.length === 0) {
        if (maze[r][c] === START) start.push(r, c);
        if (maze[r][c] === END) end.push(r, c);
      } else {
        return [start, end];
      }
    }
  }
};

const day16 = (fileInput) => {
  const [maze, rows, cols, start, [endRow, endCol]] = parseInput(fileInput);
  const queue = [];
  const visited = new Set();

  for (let i = 0; i < 4; i++) {
    const turnCost = i === 0 ? 0 : TURN_COST;
    queue.push([...start, i, turnCost]);
  }

  while (queue.length > 0) {
    queue.sort((a, b) => a[3] - b[3]);
    const [row, col, dir, score] = queue.shift();

    if (row === endRow && col === endCol) return score;

    const stateKey = `${row},${col},${dir}`;
    if (visited.has(stateKey)) continue;
    visited.add(stateKey);

    for (let i = 0; i < 4; i++) {
      const turnCost = dir === i ? 0 : TURN_COST;
      const newRow = row + DIRECTIONS[i][0];
      const newCol = col + DIRECTIONS[i][1];
      const nextCell = maze[newRow][newCol];

      if (0 <= newRow < rows && 0 <= newCol < cols && nextCell !== WALL)
        queue.push([newRow, newCol, i, score + STEP_COST + turnCost]);
    }
  }

  return null;
};

// --------------------------------------------------------

// const day16Two = (fileInput) => {
//   const data = _readInput(fileInput);

//   return data;
// };

//const fileInput = './2024/day16/example.txt'; // 7036
//const fileInput = './2024/day16/example2.txt'; // 11048
const fileInput = './2024/day16/input.txt'; // 105496

console.log(day16(fileInput));
//console.log(day16Two(fileInput));
