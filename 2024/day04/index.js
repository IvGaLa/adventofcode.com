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

const checkHorizontal = (line) => {
  const xmas = /XMAS/g
  const samx = /SAMX/g
  return [...line.matchAll(xmas)].length + [...line.matchAll(samx)].length
}

const checkVerticalWordDown = (_data, index, i) => {
  let _search = ''
  try {
    _search = _data[index][i] + _data[index + 1][i] + _data[index + 2][i] + _data[index + 3][i]
  } catch (error) {
    _search = null
  }
  return (_search === xmas) ? 1 : 0
}

const checkVerticalWordUp = (_data, index, i) => {
  let _search = ''
  try {
    _search = _data[index][i] + _data[index - 1][i] + _data[index - 2][i] + _data[index - 3][i]
  } catch (error) {
    _search = null
  }
  return (_search === xmas) ? 1 : 0
}

const checkVertical = (_data, index) => {
  let count = 0
  const line = _data[index]
  for (let i = 0; i < line.length; i++) {
    if (line[i] === 'X') {
      count += checkVerticalWordUp(_data, index, i)
      count += checkVerticalWordDown(_data, index, i)
    }
  }

  return count
}

const checkDiagonalWordUpRight = (_data, index, i) => {
  let _search = ''
  try {
    _search = _data[index][i] + _data[index - 1][i + 1] + _data[index - 2][i + 2] + _data[index - 3][i + 3]
  } catch (error) {
    _search = null
  }

  return (_search === xmas) ? 1 : 0
}

const checkDiagonalWordUpLeft = (_data, index, i) => {
  let _search = ''
  try {
    _search = _data[index][i] + _data[index - 1][i - 1] + _data[index - 2][i - 2] + _data[index - 3][i - 3]
  } catch (error) {
    _search = null
  }
  return (_search === xmas) ? 1 : 0
}

const checkDiagonalWordDownRight = (_data, index, i) => {
  let _search = ''
  try {
    _search = _data[index][i] + _data[index + 1][i + 1] + _data[index + 2][i + 2] + _data[index + 3][i + 3]
  } catch (error) {
    _search = null
  }
  return (_search === xmas) ? 1 : 0
}

const checkDiagonalWordDownLeft = (_data, index, i) => {
  let _search = ''
  try {
    _search = _data[index][i] + _data[index + 1][i - 1] + _data[index + 2][i - 2] + _data[index + 3][i - 3]
  } catch (error) {
    _search = null
  }
  return (_search === xmas) ? 1 : 0
}

const checkDiagonal = (_data, index) => {
  let count = 0
  const line = _data[index]
  for (let i = 0; i < line.length; i++) {
    if (line[i] === 'X') {
      count += checkDiagonalWordUpRight(_data, index, i) // Up-Right
      count += checkDiagonalWordUpLeft(_data, index, i) // Up-Left
      count += checkDiagonalWordDownRight(_data, index, i) // Down-Right
      count += checkDiagonalWordDownLeft(_data, index, i) // Down-Left
    }
  }

  return count
}


const day04 = (fileInput) => {
  const _data = _readInput(fileInput)

  let count = 0

  for (let i = 0; i < _data.length; i++) {
    count += checkHorizontal(_data[i])
    count += checkVertical(_data, i)
    count += checkDiagonal(_data, i)
  }

  return count
}


// --------------------------------------------------------



const checkX = (_data, lineIndex, chrIndex) => {
  let _search = false
  try {
    let diagonal1 = _data[lineIndex][chrIndex] + _data[lineIndex + 1][chrIndex + 1] + _data[lineIndex + 2][chrIndex + 2]
    let diagonal2 = _data[lineIndex][chrIndex + 2] + _data[lineIndex + 1][chrIndex + 1] + _data[lineIndex + 2][chrIndex]

    if (
      (diagonal1 === mas && diagonal2 === sam) ||
      (diagonal1 === mas && diagonal2 === mas) ||
      (diagonal1 === sam && diagonal2 === mas) ||
      (diagonal1 === sam && diagonal2 === sam)
    ) return 1

  } catch (error) {
    return 0
  }
  return (_search) ? 1 : 0
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


const xmas = 'XMAS'
const mas = 'MAS'
const sam = 'SAM'

//const fileInput = './2024/day04/example.txt'
const fileInput = './2024/day04/input.txt'

console.log(day04(fileInput)); // 2573
console.log(day04Two(fileInput)); // 1850