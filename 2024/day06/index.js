/*
--- Day 6: Guard Gallivant ---
The Historians use their fancy device again, this time to whisk you all away to the North Pole prototype suit manufacturing lab... in the year 1518! It turns out that having direct access to history is very convenient for a group of historians.

You still have to be careful of time paradoxes, and so it will be important to avoid anyone from 1518 while The Historians search for the Chief. Unfortunately, a single guard is patrolling this part of the lab.

Maybe you can work out where the guard will go ahead of time so that The Historians can search safely?

You start by making a map (your puzzle input) of the situation. For example:

....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
The map shows the current position of the guard with ^ (to indicate the guard is currently facing up from the perspective of the map). Any obstructions - crates, desks, alchemical reactors, etc. - are shown as #.

Lab guards in 1518 follow a very strict patrol protocol which involves repeatedly following these steps:

If there is something directly in front of you, turn right 90 degrees.
Otherwise, take a step forward.
Following the above protocol, the guard moves up several times until she reaches an obstacle (in this case, a pile of failed suit prototypes):

....#.....
....^....#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...
Because there is now an obstacle in front of the guard, she turns right before continuing straight in her new facing direction:

....#.....
........>#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...
Reaching another obstacle (a spool of several very long polymers), she turns right again and continues downward:

....#.....
.........#
..........
..#.......
.......#..
..........
.#......v.
........#.
#.........
......#...
This process continues for a while, but the guard eventually leaves the mapped area (after walking past a tank of universal solvent):

....#.....
.........#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#v..
By predicting the guard's route, you can determine which specific positions in the lab will be in the patrol path. Including the guard's starting position, the positions visited by the guard before leaving the area are marked with an X:

....#.....
....XXXXX#
....X...X.
..#.X...X.
..XXXXX#X.
..X.X.X.X.
.#XXXXXXX.
.XXXXXXX#.
#XXXXXXX..
......#X..
In this example, the guard will visit 41 distinct positions on your map.

Predict the path of the guard. How many distinct positions will the guard visit before leaving the mapped area?

To begin, get your puzzle input.
*/

import { _readInput } from '../../lib.js'


const getInitialPosition = (_data) => {
  for (let x = 0; x < _data.length; x++) {
    const row = _data[x]
    for (let y = 0; y < row.length; y++) {
      if (_data[x][y] === '^') return [x, y]
    }
  }

  return [-1, -1] // ^ not found
}

const changeDirection = () => {
  switch (direction) {
    case 'u':
      direction = 'r'
      break

    case 'r':
      direction = 'd'
      break

    case 'd':
      direction = 'l'
      break

    case 'l':
      direction = 'u'
      break
  }
}


const day06 = (fileInput) => {
  const _data = _readInput(fileInput)
  let [x, y] = getInitialPosition(_data)
  const rowLength = _data.length - 1
  const colLength = _data[0].length - 1
  const pos = new Map()
  pos.set(`${x}-${y}`, direction)

  while (x > 0 && x < rowLength && y > 0 && y < colLength) {
    const moveX = directions[direction][0] + x
    const moveY = directions[direction][1] + y
    if (_data[moveX][moveY] === desk) changeDirection()
    x = directions[direction][0] + x
    y = directions[direction][1] + y
    if (!pos.has(`${x}-${y}`)) pos.set(`${x}-${y}`, direction)
  }

  return pos.size
}


// --------------------------------------------------------


// const day06Two = (fileInput) => {
//   const _data = _readInput(fileInput)

//   return _data
// }

const desk = '#'
let direction = 'u'
const directions = {
  u: [-1, 0], // up
  r: [0, 1], // right
  d: [1, 0], // down
  l: [0, -1] // left
}


//const fileInput = './2024/day06/example.txt' // 41
const fileInput = './2024/day06/input.txt'

console.log(day06(fileInput)); // 5212
//console.log(day06Two(fileInput));