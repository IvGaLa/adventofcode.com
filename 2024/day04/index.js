/*
--- Day 4: Ceres Search ---
"Looks like the Chief's not here. Next!" One of The Historians pulls out a device and pushes the only button on it. After a brief flash, you recognize the interior of the Ceres monitoring station!

As the search for the Chief continues, a small Elf who lives on the station tugs on your shirt; she'd like to know if you could help her with her word search (your puzzle input). She only has to find one word: XMAS.

This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words. It's a little unusual, though, as you don't merely need to find one instance of XMAS - you need to find all of them. Here are a few ways XMAS might appear, where irrelevant characters have been replaced with .:


..X...
.SAMX.
.A..A.
XMAS.S
.X....
The actual word search will be full of letters instead. For example:

MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
In this word search, XMAS occurs a total of 18 times; here's the same word search again, but where letters not involved in any XMAS have been replaced with .:

....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX
Take a look at the little Elf's word search. How many times does XMAS appear?

To begin, get your puzzle input


--- Part Two ---
The Elf looks quizzically at you. Did you misunderstand the assignment?

Looking for the instructions, you flip over the word search to find that this isn't actually an XMAS puzzle; it's an X-MAS puzzle in which you're supposed to find two MAS in the shape of an X. One way to achieve that is like this:

M.S
.A.
M.S
Irrelevant characters have again been replaced with . in the above diagram. Within the X, each MAS can be written forwards or backwards.

Here's the same example from before, but this time all of the X-MASes have been kept instead:

.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........
In this example, an X-MAS appears 9 times.

Flip the word search from the instructions back over to the word search side and try again. How many times does an X-MAS appear?


*/

import { _readInput } from '../../lib.js'

const checkWord = (_data, row, col, direction) => {
  const xmas = 'XMAS'
  const [dx, dy] = direction
  let word = ''

  for (let i = 0; i < xmas.length; i++) {
    const newRow = row + dx * i
    const newCol = col + dy * i
    if (newRow < 0 || newRow >= _data.length || newCol < 0 || newCol >= _data[0].length) return 0

    word += _data[newRow][newCol]
  }

  return word === xmas ? 1 : 0
}

const checkDirections = (_data, row, col) => {
  const directions = [
    [0, 1],   // Right
    [1, 0],   // Down
    [1, 1],   // Up-Right
    [1, -1],  // Down-Left
    [-1, 0],  // Up
    [-1, 1],  // Up-Right
    [-1, -1], // Up-Left
    [0, -1],  // Left
  ]

  return directions.reduce((count, dir) => count + checkWord(_data, row, col, dir), 0)
}

const day04 = (fileInput) => {
  const _data = _readInput(fileInput)
  let count = 0

  for (let row = 0; row < _data.length; row++) {
    for (let col = 0; col < _data[row].length; col++) {
      if (_data[row][col] === 'X') {
        count += checkDirections(_data, row, col)
      }
    }
  }

  return count
}

// --------------------------------------------------------


const checkX = (_data, lineIndex, chrIndex) => {
  const mas = 'MAS'
  const sam = 'SAM'
  const len = mas.length

  let diagonal1 = ''
  let diagonal2 = ''

  for (let i = 0; i < len; i++) {
    diagonal1 += _data[lineIndex + i]?.[chrIndex + i] || ''
    diagonal2 += _data[lineIndex + i]?.[chrIndex + (len - 1) - i] || ''
  }

  const validCombinations = [
    [mas, sam],
    [mas, mas],
    [sam, mas],
    [sam, sam],
  ]
  return validCombinations.some(([d1, d2]) => diagonal1 === d1 && diagonal2 === d2) ? 1 : 0

}

const day04Two = (fileInput) => {
  const _data = _readInput(fileInput)
  let count = 0
  for (let i = 0; i < _data.length; i++) {
    for (let y = 0; y < _data[i].length; y++) {
      if (_data[i][y] === 'M' || _data[i][y] === 'S') count += checkX(_data, i, y)
    }
  }
  return count
}

//const fileInput = './2024/day04/example.txt'
const fileInput = './2024/day04/input.txt'

console.log(day04(fileInput)); // 2573
console.log(day04Two(fileInput)); // 1850