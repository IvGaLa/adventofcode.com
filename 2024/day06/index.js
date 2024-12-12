import { _readInput } from '../../lib.js';

const getInitialPosition = (_data) => {
  direction = 0;
  for (let x = 0; x < _data.length; x++) {
    const row = _data[x];
    for (let y = 0; y < row.length; y++) {
      if (_data[x][y] === '^') return [x, y];
    }
  }

  return [-1, -1]; // ^ not found
};

const changeDirection = () => {
  direction++;
  if (direction === 4) direction = 0;
};

const day06 = (_data) => {
  let [x, y] = getInitialPosition(_data);
  const rowLength = _data.length - 1;
  const colLength = _data[0].length - 1;
  const pos = new Set();
  pos.add(JSON.stringify([x, y]));

  while (x > 0 && x < rowLength && y > 0 && y < colLength) {
    const moveX = directions[direction][0] + x;
    const moveY = directions[direction][1] + y;
    if (_data[moveX][moveY] === desk) changeDirection();
    x = directions[direction][0] + x;
    y = directions[direction][1] + y;
    pos.add(JSON.stringify([x, y]));
  }

  return pos;
};

// --------------------------------------------------------

const checkLoop = (data) => {
  let pos = getInitialPosition(data);

  if (!pos) return null;

  const obstacles = new Set();

  while (true) {
    const nextPos = [
      pos[0] + directions[direction][0],
      pos[1] + directions[direction][1],
    ];

    if (
      nextPos[0] < 0 ||
      nextPos[0] >= data.length ||
      nextPos[1] < 0 ||
      nextPos[1] >= data[0].length
    )
      break;

    while ([desk, obstacle].includes(data[nextPos[0]][nextPos[1]])) {
      const obstacleKey = JSON.stringify({ pos, direction });

      if (obstacles.has(obstacleKey)) return true;
      else obstacles.add(obstacleKey);

      changeDirection();

      nextPos[0] = pos[0] + directions[direction][0];
      nextPos[1] = pos[1] + directions[direction][1];
    }

    pos = nextPos;
  }

  return false;
};

const day06Two = (_data) => {
  let count = 0;
  const path = Array.from(day06(_data)).map(JSON.parse);

  if (!path) return count;

  for (const pos of path) {
    const newData = _data.map((row) => [...row]);
    newData[pos[0]][pos[1]] = obstacle;

    if (checkLoop(newData)) count++;
  }

  return count;
};

//const fileInput = './2024/day06/example.txt' // 41 - 6
const fileInput = './2024/day06/input.txt';

const data = _readInput(fileInput);
const desk = '#';
const obstacle = 'O';
let direction;
const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

console.log(day06(data).size); // 5212
console.log(day06Two(data)); // 1767
