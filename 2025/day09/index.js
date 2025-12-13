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

const day09Two = (fileInput) => {
  const data = _readInput(fileInput);

  return data;
};

//const fileInput = './2025/day09/example.txt'; // 50 -
const fileInput = './2025/day09/input.txt'; // 4777967538 -

console.log(day09(fileInput));
//console.log(day09Two(fileInput));
