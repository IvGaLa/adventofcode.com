/*
--- Day 9: Movie Theater ---
You slide down the firepole in the corner of the playground and land in the North Pole base movie theater!

The movie theater has a big tile floor with an interesting pattern. Elves here are redecorating the theater by switching out some of the square tiles in the big grid they form. Some of the tiles are red; the Elves would like to find the largest rectangle that uses red tiles for two of its opposite corners. They even have a list of where the red tiles are located in the grid (your puzzle input).

For example:

7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
Showing red tiles as # and other tiles as ., the above arrangement of red tiles would look like this:

..............
.......#...#..
..............
..#....#......
..............
..#......#....
..............
.........#.#..
..............
You can choose any two red tiles as the opposite corners of your rectangle; your goal is to find the largest rectangle possible.

For example, you could make a rectangle (shown as O) with an area of 24 between 2,5 and 9,7:

..............
.......#...#..
..............
..#....#......
..............
..OOOOOOOO....
..OOOOOOOO....
..OOOOOOOO.#..
..............
Or, you could make a rectangle with area 35 between 7,1 and 11,7:

..............
.......OOOOO..
.......OOOOO..
..#....OOOOO..
.......OOOOO..
..#....OOOOO..
.......OOOOO..
.......OOOOO..
..............
You could even make a thin rectangle with an area of only 6 between 7,3 and 2,3:

..............
.......#...#..
..............
..OOOOOO......
..............
..#......#....
..............
.........#.#..
..............
Ultimately, the largest rectangle you can make in this example has area 50. One way to do this is between 2,5 and 11,1:

..............
..OOOOOOOOOO..
..OOOOOOOOOO..
..OOOOOOOOOO..
..OOOOOOOOOO..
..OOOOOOOOOO..
..............
.........#.#..
..............
Using two red tiles as opposite corners, what is the largest area of any rectangle you can make?

--- Part Two ---
The Elves just remembered: they can only switch out tiles that are red or green. So, your rectangle can only include red or green tiles.

In your list, every red tile is connected to the red tile before and after it by a straight line of green tiles. The list wraps, so the first red tile is also connected to the last red tile. Tiles that are adjacent in your list will always be on either the same row or the same column.

Using the same example as before, the tiles marked X would be green:

..............
.......#XXX#..
.......X...X..
..#XXXX#...X..
..X........X..
..#XXXXXX#.X..
.........X.X..
.........#X#..
..............
In addition, all of the tiles inside this loop of red and green tiles are also green. So, in this example, these are the green tiles:

..............
.......#XXX#..
.......XXXXX..
..#XXXX#XXXX..
..XXXXXXXXXX..
..#XXXXXX#XX..
.........XXX..
.........#X#..
..............
The remaining tiles are never red nor green.

The rectangle you choose still must have red tiles in opposite corners, but any other tiles it includes must now be red or green. This significantly limits your options.

For example, you could make a rectangle out of red and green tiles with an area of 15 between 7,3 and 11,1:

..............
.......OOOOO..
.......OOOOO..
..#XXXXOOOOO..
..XXXXXXXXXX..
..#XXXXXX#XX..
.........XXX..
.........#X#..
..............
Or, you could make a thin rectangle with an area of 3 between 9,7 and 9,5:

..............
.......#XXX#..
.......XXXXX..
..#XXXX#XXXX..
..XXXXXXXXXX..
..#XXXXXXOXX..
.........OXX..
.........OX#..
..............
The largest rectangle you can make in this example using only red and green tiles has area 24. One way to do this is between 9,5 and 2,3:

..............
.......#XXX#..
.......XXXXX..
..OOOOOOOOXX..
..OOOOOOOOXX..
..OOOOOOOOXX..
.........XXX..
.........#X#..
..............
Using two red tiles as opposite corners, what is the largest area of any rectangle you can make using only red and green tiles?

*/

import { _readInput } from '../../lib.js';

const getEdges = (fileInput) =>
  _readInput(fileInput).map((line) => line.split(',').map(Number));

const day09 = (fileInput) => {
  const edges = getEdges(fileInput);
  const edgesLength = edges.length;
  let count = 0;

  for (let i = 0; i < edgesLength - 1; i++)
    for (let j = i + 1; j < edgesLength; j++)
      count = Math.max(
        count,
        Math.abs(
          (edges[i][0] - edges[j][0] + 1) * (edges[i][1] - edges[j][1] + 1),
        ),
      );

  return count;
};

// --------------------------------------------------------

// Using IA

const day09Two = (fileInput) => {
  const input = getEdges(fileInput);

  const xCoords = [...new Set(input.map((p) => p[0]))].sort((a, b) => a - b);
  const yCoords = [...new Set(input.map((p) => p[1]))].sort((a, b) => a - b);

  const coordsX = Object.fromEntries(xCoords.map((x, i) => [x, i]));
  const coordsY = Object.fromEntries(yCoords.map((y, i) => [y, i]));

  const tilemap = Array.from({ length: yCoords.length }, () =>
    Array(xCoords.length).fill('.'),
  );

  for (let i = 0; i < input.length - 1; i++) {
    const p1 = input[i];
    const p2 = input[i + 1];

    const x1 = coordsX[p1[0]];
    const y1 = coordsY[p1[1]];

    const x2 = coordsX[p2[0]];
    const y2 = coordsY[p2[1]];

    tilemap[y1][x1] = 'X';
    tilemap[y2][x2] = 'X';

    if (x1 === x2)
      for (let y = Math.min(y1, y2) + 1; y < Math.max(y1, y2); y++)
        tilemap[y][x1] = 'O';
    else
      for (let x = Math.min(x1, x2) + 1; x < Math.max(x1, x2); x++)
        tilemap[y1][x] = 'O';
  }

  for (let y = 1; y < tilemap.length - 1; y++) {
    const row = tilemap[y];
    const above = tilemap[y - 1];
    let inSection = false;

    for (let x = 0; x < row.length; x++) {
      const current = row[x];
      const top = above[x];

      if (current === 'X' || current === 'O') {
        if (top === 'X' || top === 'O') inSection = !inSection;
        continue;
      }

      const remainingMarkers = row
        .slice(x + 1)
        .filter((z) => z === 'X' || z === 'O').length;

      if (inSection) {
        if (remainingMarkers === 0) {
          inSection = false;
        } else {
          row[x] = 'Z';
        }
      } else if ((top === 'X' || top === 'O') && remainingMarkers === 1) {
        inSection = true;
        row[x] = 'Z';
      }
    }
  }

  let result = 0;

  for (let i = 0; i < input.length; i++) {
    const first = input[i];
    const x1 = coordsX[first[0]];
    const y1 = coordsY[first[1]];

    for (let j = i + 1; j < input.length; j++) {
      const second = input[j];
      const x2 = coordsX[second[0]];
      const y2 = coordsY[second[1]];

      if (!isFilledRectangle(x1, y1, x2, y2, tilemap)) continue;

      const product =
        (Math.abs(first[0] - second[0]) + 1) *
        (Math.abs(first[1] - second[1]) + 1);

      if (product > result) result = product;
    }
  }

  return result;
};

const isFilledRectangle = (x1, y1, x2, y2, tilemap) => {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);

  for (let y = minY; y <= maxY; y++)
    for (let x = minX; x <= maxX; x++) if (tilemap[y][x] === '.') return false;

  return true;
};

//const fileInput = './2025/day09/example.txt'; // 50 - 24
const fileInput = './2025/day09/input.txt'; // 4777967538 - 1439894345

console.log(day09(fileInput));
console.log(day09Two(fileInput));
