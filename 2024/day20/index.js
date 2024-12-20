/*

--- Day 20: Race Condition ---
The Historians are quite pixelated again. This time, a massive, black building looms over you - you're right outside the CPU!

While The Historians get to work, a nearby program sees that you're idle and challenges you to a race. Apparently, you've arrived just in time for the frequently-held race condition festival!

The race takes place on a particularly long and twisting code path; programs compete to see who can finish in the fewest picoseconds. The winner even gets their very own mutex!

They hand you a map of the racetrack (your puzzle input). For example:

###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
The map consists of track (.) - including the start (S) and end (E) positions (both of which also count as track) - and walls (#).

When a program runs through the racetrack, it starts at the start position. Then, it is allowed to move up, down, left, or right; each such move takes 1 picosecond. The goal is to reach the end position as quickly as possible. In this example racetrack, the fastest time is 84 picoseconds.

Because there is only a single path from the start to the end and the programs all go the same speed, the races used to be pretty boring. To make things more interesting, they introduced a new rule to the races: programs are allowed to cheat.

The rules for cheating are very strict. Exactly once during a race, a program may disable collision for up to 2 picoseconds. This allows the program to pass through walls as if they were regular track. At the end of the cheat, the program must be back on normal track again; otherwise, it will receive a segmentation fault and get disqualified.

So, a program could complete the course in 72 picoseconds (saving 12 picoseconds) by cheating for the two moves marked 1 and 2:

###############
#...#...12....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
Or, a program could complete the course in 64 picoseconds (saving 20 picoseconds) by cheating for the two moves marked 1 and 2:

###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...12..#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
This cheat saves 38 picoseconds:

###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.####1##.###
#...###.2.#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
This cheat saves 64 picoseconds and takes the program directly to the end:

###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..21...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
Each cheat has a distinct start position (the position where the cheat is activated, just before the first move that is allowed to go through walls) and end position; cheats are uniquely identified by their start position and end position.

In this example, the total number of cheats (grouped by the amount of time they save) are as follows:

There are 14 cheats that save 2 picoseconds.
There are 14 cheats that save 4 picoseconds.
There are 2 cheats that save 6 picoseconds.
There are 4 cheats that save 8 picoseconds.
There are 2 cheats that save 10 picoseconds.
There are 3 cheats that save 12 picoseconds.
There is one cheat that saves 20 picoseconds.
There is one cheat that saves 36 picoseconds.
There is one cheat that saves 38 picoseconds.
There is one cheat that saves 40 picoseconds.
There is one cheat that saves 64 picoseconds.
You aren't sure what the conditions of the racetrack will be like, so to give yourself as many options as possible, you'll need a list of the best cheats. How many cheats would save you at least 100 picoseconds?


--- Part Two ---
The programs seem perplexed by your list of cheats. Apparently, the two-picosecond cheating rule was deprecated several milliseconds ago! The latest version of the cheating rule permits a single cheat that instead lasts at most 20 picoseconds.

Now, in addition to all the cheats that were possible in just two picoseconds, many more cheats are possible. This six-picosecond cheat saves 76 picoseconds:

###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#1#####.#.#.###
#2#####.#.#...#
#3#####.#.###.#
#456.E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
Because this cheat has the same start and end positions as the one above, it's the same cheat, even though the path taken during the cheat is different:

###############
#...#...#.....#
#.#.#.#.#.###.#
#S12..#.#.#...#
###3###.#.#.###
###4###.#.#...#
###5###.#.###.#
###6.E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
Cheats don't need to use all 20 picoseconds; cheats can last any amount of time up to and including 20 picoseconds (but can still only end when the program is on normal track). Any cheat time not used is lost; it can't be saved for another cheat later.

You'll still need a list of the best cheats, but now there are even more to choose between. Here are the quantities of cheats in this example that save 50 picoseconds or more:

There are 32 cheats that save 50 picoseconds.
There are 31 cheats that save 52 picoseconds.
There are 29 cheats that save 54 picoseconds.
There are 39 cheats that save 56 picoseconds.
There are 25 cheats that save 58 picoseconds.
There are 23 cheats that save 60 picoseconds.
There are 20 cheats that save 62 picoseconds.
There are 19 cheats that save 64 picoseconds.
There are 12 cheats that save 66 picoseconds.
There are 14 cheats that save 68 picoseconds.
There are 12 cheats that save 70 picoseconds.
There are 22 cheats that save 72 picoseconds.
There are 4 cheats that save 74 picoseconds.
There are 3 cheats that save 76 picoseconds.
Find the best cheats using the updated cheating rules. How many cheats would save you at least 100 picoseconds?

*/

import { _readInput } from '../../lib.js';

const DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const WALL = '#';
const EMPTY = '.';
const START = 'S';
const END = 'E';

const parseInput = (fileInput) => {
  const map = [];
  const start = [];
  const end = [];

  _readInput(fileInput).forEach((row, x) => {
    row = row.split('');
    map.push(row);
    row.forEach((chr, y) => {
      if (chr === START) start.push(y, x);
      if (chr === END) end.push(y, x);
    });
  });
  const rows = map.length;
  const cols = map[0].length;

  return [map, start, end, rows, cols];
};

const distance = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

const outOfBound = (x, y, rows, cols) =>
  x < 0 || y < 0 || x >= cols || y >= rows;

const distanceMap = (map, rows, cols, froms, entryDist = 0) => {
  let cur;

  let filled = map.map((row) => row.slice().fill(Infinity)),
    stack = froms.map((from) => ({
      pos: [...from],
      dist: entryDist,
    }));

  while ((cur = stack.shift())) {
    let [cx, cy] = cur.pos;

    if (filled[cy][cx] <= cur.dist) continue;
    filled[cy][cx] = cur.dist;

    DIRECTIONS.forEach(([dx, dy]) => {
      let [x, y] = [cx + dx, cy + dy];
      if (outOfBound(x, y, rows, cols)) return true;
      if (map[y][x] === WALL) return true;
      stack.push({
        pos: [x, y],
        dist: cur.dist + 1,
      });
    });
  }
  return filled;
};

const run = (map, start, end, rows, cols, cheatsCount = 2) => {
  let cheats = {};

  map.forEach((row, y) =>
    row.forEach((chr, x) => {
      if (chr === WALL) return true;
      map[y][x] = EMPTY;
    }),
  );

  let dmap = distanceMap(map, rows, cols, [start]);
  let pos = start;
  let count = 0;

  while (pos[0] != end[0] || pos[1] !== end[1]) {
    for (let y = pos[1] - cheatsCount; y <= pos[1] + cheatsCount; y++) {
      for (let x = pos[0] - cheatsCount; x <= pos[0] + cheatsCount; x++) {
        if (outOfBound(x, y, rows, cols)) continue;
        let d = distance(pos, [x, y]);
        if (d >= cheatsCount + 1) continue;
        if (map[y][x] !== EMPTY) continue;
        let saved = dmap[y][x] - dmap[pos[1]][pos[0]] - d;
        let key = [...pos, ...[x, y]];
        if (
          saved > 0 &&
          (cheats[key] === undefined || cheats[key] < saved) &&
          saved >= 100
        )
          count++;
      }
    }

    DIRECTIONS.some(([dx, dy]) => {
      let [x, y] = [pos[0] + dx, pos[1] + dy];
      if (
        !outOfBound(x, y, rows, cols) &&
        dmap[y][x] == dmap[pos[1]][pos[0]] + 1
      ) {
        pos = [x, y];
        return true;
      }
      return false;
    });
  }

  return count;
};

const day20 = (fileInput) => run(...parseInput(fileInput));

// --------------------------------------------------------

const day20Two = (fileInput) => run(...parseInput(fileInput), 20);

//const fileInput = './2024/day20/example.txt'; 0 - 0
const fileInput = './2024/day20/input.txt';

console.log(day20(fileInput)); // 139
console.log(day20Two(fileInput)); // 990096
