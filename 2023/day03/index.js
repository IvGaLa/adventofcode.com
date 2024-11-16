/*
--- Day 3: Gear Ratios ---
You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?
*/

import { _readInput } from "../lib.js";


const findNumberPositions = (str, lineNumber) => {
  const regex = /\d+/g;
  const matches = [...str.matchAll(regex)];
  return matches.map(match => {
    const firstPosition = Number(match.index)
    const lastPosition = Number(match.index + match[0].length - 1)
    const number = Number(match[0])
    return { number, firstPosition, lastPosition, lineNumber, str }
  });

}


const checkAdyacent = (positions) => {
  const { number, firstPosition, lastPosition, str } = positions
  const regexp = /[^0-9.]/

  let returned = 0

  // check in front
  if (firstPosition > 0)
    if (regexp.test(str[firstPosition - 1])) returned = number


  // check behind
  if (lastPosition < str.length - 1)
    if (regexp.test(str[lastPosition + 1])) returned = number

  return returned
}

const checkDiagonal = (position, line) => {
  const { firstPosition, lastPosition, number } = position
  const regexp = /[^0-9.]/
  const first = (firstPosition > 0) ? firstPosition - 1 : firstPosition
  const last = (lastPosition < line.length) ? lastPosition + 1 : lastPosition
  const _slice = line.slice(first, last + 1)

  return (regexp.test(_slice)) ? number : 0

}



const day03 = () => {
  const _fileInput = './2023/day03/input.txt'
  //const _fileInput = './2023/day03/example.txt' // 4361
  const _data = _readInput(_fileInput)
  const positions = []
  const values = []
  for (let i = 0; i < _data.length; i++) {
    positions.push(findNumberPositions(_data[i], i))
  }

  positions.map(position => {
    if (position.length > 0) {
      position.map(p => {
        if ((p.lineNumber > 0) && (p.lineNumber < _data.length - 1)) {
          values.push(checkDiagonal(p, _data[p.lineNumber - 1]))
          values.push(checkDiagonal(p, _data[p.lineNumber + 1]))
        }
        if (p.lineNumber == 0)
          values.push(checkDiagonal(p, _data[p.lineNumber + 1]))

        if (p.lineNumber == _data.length - 1)
          values.push(checkDiagonal(p, _data[p.lineNumber - 1]))

        values.push(checkAdyacent(p))
      })
    }


  })

  return values.reduce((previous, value) => Number(previous + value))

}




console.log(`Result: ${day03()}`); // Result: 549908





