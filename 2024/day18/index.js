/*
--- Day 18: RAM Run ---
You and The Historians look a lot more pixelated than you remember. You're inside a computer at the North Pole!

Just as you're about to check out your surroundings, a program runs up to you. "This region of memory isn't safe! The User misunderstood what a pushdown automaton is and their algorithm is pushing whole bytes down on top of us! Run!"

The algorithm is fast - it's going to cause a byte to fall into your memory space once every nanosecond! Fortunately, you're faster, and by quickly scanning the algorithm, you create a list of which bytes will fall (your puzzle input) in the order they'll land in your memory space.

Your memory space is a two-dimensional grid with coordinates that range from 0 to 70 both horizontally and vertically. However, for the sake of example, suppose you're on a smaller grid with coordinates that range from 0 to 6 and the following list of incoming byte positions:

5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0
Each byte position is given as an X,Y coordinate, where X is the distance from the left edge of your memory space and Y is the distance from the top edge of your memory space.

You and The Historians are currently in the top left corner of the memory space (at 0,0) and need to reach the exit in the bottom right corner (at 70,70 in your memory space, but at 6,6 in this example). You'll need to simulate the falling bytes to plan out where it will be safe to run; for now, simulate just the first few bytes falling into your memory space.

As bytes fall into your memory space, they make that coordinate corrupted. Corrupted memory coordinates cannot be entered by you or The Historians, so you'll need to plan your route carefully. You also cannot leave the boundaries of the memory space; your only hope is to reach the exit.

In the above example, if you were to draw the memory space after the first 12 bytes have fallen (using . for safe and # for corrupted), it would look like this:

...#...
..#..#.
....#..
...#..#
..#..#.
.#..#..
#.#....
You can take steps up, down, left, or right. After just 12 bytes have corrupted locations in your memory space, the shortest path from the top left corner to the exit would take 22 steps. Here (marked with O) is one such path:

OO.#OOO
.O#OO#O
.OOO#OO
...#OO#
..#OO#.
.#.O#..
#.#OOOO
Simulate the first kilobyte (1024 bytes) falling onto your memory space. Afterward, what is the minimum number of steps needed to reach the exit?


--- Part Two ---
The Historians aren't as used to moving around in this pixelated universe as you are. You're afraid they're not going to be fast enough to make it to the exit before the path is completely blocked.

To determine how fast everyone needs to go, you need to determine the first byte that will cut off the path to the exit.

In the above example, after the byte at 1,1 falls, there is still a path to the exit:

O..#OOO
O##OO#O
O#OO#OO
OOO#OO#
###OO##
.##O###
#.#OOOO
However, after adding the very next byte (at 6,1), there is no longer a path to the exit:

...#...
.##..##
.#..#..
...#..#
###..##
.##.###
#.#....
So, in this example, the coordinates of the first byte that prevents the exit from being reachable are 6,1.

Simulate more of the bytes that are about to corrupt your memory space. What are the coordinates of the first byte that will prevent the exit from being reachable from your starting position? (Provide the answer as two integers separated by a comma with no other characters.)




*/

import { _readInput } from '../../lib.js';

//const dataType = 'example';
const dataType = 'input';

const data = {
  example: {
    SIZE: 6,
    LIMIT: 12,
    FILEINPUT: './2024/day18/example.txt', // 22 - 6,1
  },
  input: {
    SIZE: 70,
    LIMIT: 1024,
    FILEINPUT: './2024/day18/input.txt', // 260 - 24,48
  },
};

const FILEINPUT = data[dataType].FILEINPUT;
const SIZE = data[dataType].SIZE;
const xSize = SIZE + 1;
const ySize = SIZE + 1;
const LIMIT = data[dataType].LIMIT;
const WALL = '#';
const EMPTY = '.';
const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const parseInput = (fileInput) =>
  _readInput(fileInput).map((el) => el.split(',').map(Number));

const createMap = (fileInput) => {
  const map = Array.from({ length: xSize }, () => Array(ySize).fill(EMPTY));
  parseInput(fileInput)
    .slice(0, LIMIT)
    .forEach(([x, y]) => (map[y][x] = WALL));
  return map;
};

const findPath = (map, start, end) => {
  const rows = xSize;
  const cols = ySize;
  const queue = [{ x: start[0], y: start[1], steps: 0 }];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  visited[start[0]][start[1]] = true;

  while (queue.length > 0) {
    const { x, y, steps } = queue.shift();

    if (x === end[0] && y === end[1]) return steps;

    for (const direction of DIRECTIONS) {
      const newX = x + direction[0];
      const newY = y + direction[1];

      if (
        newX >= 0 &&
        newX < rows &&
        newY >= 0 &&
        newY < cols &&
        map[newX][newY] === EMPTY &&
        !visited[newX][newY]
      ) {
        visited[newX][newY] = true;
        queue.push({ x: newX, y: newY, steps: steps + 1 });
      }
    }
  }

  return -1;
};

const day18 = (fileInput) =>
  findPath(createMap(fileInput), [0, 0], [SIZE, SIZE]);

// --------------------------------------------------------

const day18Two = (fileInput) => {
  const nextCoords = parseInput(fileInput).slice(LIMIT);
  const map = createMap(fileInput);
  const start = [0, 0];
  const end = [SIZE, SIZE];
  let latest = start;

  while (findPath(map, start, end) !== -1) {
    latest = nextCoords.shift();
    map[latest[1]][latest[0]] = WALL;
  }

  return latest.join(',');
};

console.log(day18(FILEINPUT));
console.log(day18Two(FILEINPUT));
