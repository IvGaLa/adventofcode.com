import { _readInput } from '../../lib.js';

const day08 = (fileInput) => calculateAntinodes(fileInput);

const day08Two = (fileInput) => calculateAntinodes(fileInput, 2);

const parseInput = (fileInput) => _readInput(fileInput).map(row => row.split(''));

const extractAntennas = (grid) => new Set(grid.flatMap(row => row.filter(cell => cell !== '.')));

const calculateAntinodes = (fileInput, part = 1) => {
  const grid = parseInput(fileInput);
  const antennas = extractAntennas(grid);
  const antinodes = [];

  antennas.forEach(antenna => {
    const paths = getAllPaths(getCoordinates(grid, antenna[0]));
    const points = part === 1
      ? calculateBoundaryPoints(grid.length, paths)
      : calculateAllLinePoints(grid.length, paths);
    antinodes.push(...points);
  });

  return new Set(antinodes).size;
};

const calculateBoundaryPoints = (size, paths) => {
  return paths.reduce((points, [[x1, y1], [x2, y2]]) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const boundaries = [
      [x1 - dx, y1 - dy],
      [x2 + dx, y2 + dy]
    ];

    boundaries.forEach(([x, y]) => {
      if (isWithinBounds(x, y, size)) points.push(JSON.stringify([x, y]))
    });

    return points;
  }, []);
};

const calculateAllLinePoints = (size, paths) => {
  return paths.reduce((points, [[x1, y1], [x2, y2]]) => {
    const dx = x2 - x1;
    const dy = y2 - y1;

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        if ((y - y1) * dx === (x - x1) * dy) points.push(JSON.stringify([x, y]))
      }
    }

    return points;
  }, []);
};

const getCoordinates = (grid, target) => {
  const coordinates = [];
  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell === target) coordinates.push([x, y])
    });
  });
  return coordinates;
};

const getAllPaths = (points) => {
  const paths = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      paths.push([points[i], points[j]]);
    }
  }
  return paths;
};

const isWithinBounds = (x, y, size) => x >= 0 && x < size && y >= 0 && y < size;


//const fileInput = './2024/day08/example.txt'
const fileInput = './2024/day08/input.txt'

console.log(day08(fileInput)) // 222
console.log(day08Two(fileInput)) // 884