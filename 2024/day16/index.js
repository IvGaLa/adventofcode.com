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
  [0, 1, 'E'],
  [1, 0, 'S'],
  [0, -1, 'W'],
  [-1, 0, 'N'],
];

const parseMaze = (fileInput) => {
  const data = _readInput(fileInput);

  const maze = data.map((row) => row.split(''));
  const rows = maze.length;
  const cols = maze[0].length;

  return [maze, rows, cols];
};

const getStartFinish = (maze, rows, cols) => {
  let start = [];
  let end = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (maze[r][c] === 'S') start = [r, c];
      if (maze[r][c] === 'E') end = [r, c];
    }
  }
  return [start, end];
};

const sortQueue = (q) => q.sort((a, b) => a[3] - b[3]);

const bfs = (maze, rows, cols, start, end) => {
  let queue = [];
  const visited = new Set();

  for (let i = 0; i < 4; i++) {
    const turnCost = i === 0 ? 0 : 1000;
    queue.push([...start, i, turnCost, true]);
  }

  while (queue.length > 0) {
    queue = [...sortQueue(queue)];
    const [r, c, dir, score] = queue.shift();

    if (r === end[0] && c === end[1]) return score;

    const stateKey = `${r},${c},${dir}`;
    if (visited.has(stateKey)) continue;
    visited.add(stateKey);

    for (let i = 0; i < 4; i++) {
      const [dx, dy, _] = DIRECTIONS[i];
      const newDir = i;
      const turnCost = dir === newDir ? 0 : 1000;
      const newRow = r + dx;
      const newCol = c + dy;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        maze[newRow][newCol] !== '#'
      ) {
        queue.push([newRow, newCol, newDir, score + 1 + turnCost, false]);
      }
    }
  }

  return null;
};

const day16 = (fileInput) => {
  const [maze, rows, cols] = parseMaze(fileInput);
  let [start, end] = getStartFinish(maze, rows, cols);

  return bfs(maze, rows, cols, start, end);
};

// --------------------------------------------------------

// const day16Two = (fileInput) => {
//   const data = _readInput(fileInput);

//   return data;
// };

const fileInput = './2024/day16/example.txt'; // 7036
//const fileInput = './2024/day16/example2.txt'; // 11048
//const fileInput = './2024/day16/input.txt'; // 105496

console.log(day16(fileInput));
//console.log(day16Two(fileInput));
