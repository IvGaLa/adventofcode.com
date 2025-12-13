/*
--- Day 8: Playground ---
Equipped with a new understanding of teleporter maintenance, you confidently step onto the repaired teleporter pad.

You rematerialize on an unfamiliar teleporter pad and find yourself in a vast underground space which contains a giant playground!

Across the playground, a group of Elves are working on setting up an ambitious Christmas decoration project. Through careful rigging, they have suspended a large number of small electrical junction boxes.

Their plan is to connect the junction boxes with long strings of lights. Most of the junction boxes don't provide electricity; however, when two junction boxes are connected by a string of lights, electricity can pass between those two junction boxes.

The Elves are trying to figure out which junction boxes to connect so that electricity can reach every junction box. They even have a list of all of the junction boxes' positions in 3D space (your puzzle input).

For example:

162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689
This list describes the position of 20 junction boxes, one per line. Each position is given as X,Y,Z coordinates. So, the first junction box in the list is at X=162, Y=817, Z=812.

To save on string lights, the Elves would like to focus on connecting pairs of junction boxes that are as close together as possible according to straight-line distance. In this example, the two junction boxes which are closest together are 162,817,812 and 425,690,689.

By connecting these two junction boxes together, because electricity can flow between them, they become part of the same circuit. After connecting them, there is a single circuit which contains two junction boxes, and the remaining 18 junction boxes remain in their own individual circuits.

Now, the two junction boxes which are closest together but aren't already directly connected are 162,817,812 and 431,825,988. After connecting them, since 162,817,812 is already connected to another junction box, there is now a single circuit which contains three junction boxes and an additional 17 circuits which contain one junction box each.

The next two junction boxes to connect are 906,360,560 and 805,96,715. After connecting them, there is a circuit containing 3 junction boxes, a circuit containing 2 junction boxes, and 15 circuits which contain one junction box each.

The next two junction boxes are 431,825,988 and 425,690,689. Because these two junction boxes were already in the same circuit, nothing happens!

This process continues for a while, and the Elves are concerned that they don't have enough extension cables for all these circuits. They would like to know how big the circuits will be.

After making the ten shortest connections, there are 11 circuits: one circuit which contains 5 junction boxes, one circuit which contains 4 junction boxes, two circuits which contain 2 junction boxes each, and seven circuits which each contain a single junction box. Multiplying together the sizes of the three largest circuits (5, 4, and one of the circuits of size 2) produces 40.

Your list contains many junction boxes; connect together the 1000 pairs of junction boxes which are closest together. Afterward, what do you get if you multiply together the sizes of the three largest circuits?

--- Part Two ---
The Elves were right; they definitely don't have enough extension cables. You'll need to keep connecting junction boxes together until they're all in one large circuit.

Continuing the above example, the first connection which causes all of the junction boxes to form a single circuit is between the junction boxes at 216,146,977 and 117,168,530. The Elves need to know how far those junction boxes are from the wall so they can pick the right extension cable; multiplying the X coordinates of those two junction boxes (216 and 117) produces 25272.

Continue connecting the closest unconnected pairs of junction boxes together until they're all in the same circuit. What do you get if you multiply together the X coordinates of the last two junction boxes you need to connect?

*/

import { _readInput } from '../../lib.js';

const getCoords = (fileInput) => {
  const data = _readInput(fileInput);
  return data.map((line) => line.split(',').map(Number));
};

const getEdges = (coords) => {
  const edges = [];

  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const [x1, y1, z1] = coords[i];
      const [x2, y2, z2] = coords[j];

      const dx = x1 - x2;
      const dy = y1 - y2;
      const dz = z1 - z2;

      const distance = dx * dx + dy * dy + dz * dz;
      edges.push([distance, i, j]);
    }
  }
  return edges.sort(([d1, ,], [d2, ,]) => d1 - d2).map(([_, i, j]) => [i, j]);
};

function day08(fileInput) {
  const coords = getCoords(fileInput);
  const coordsLength = coords.length;

  const circuits = Array.from({ length: coordsLength }, (_, i) => [i]);
  const circuitIndex = Array.from({ length: coordsLength }, (_, i) => i);

  const nodes = getEdges(coords);

  const LENGTH = coordsLength > 20 ? 1000 : 10;

  for (let i = 0; i < LENGTH; i++) {
    const [nodeA, nodeB] = nodes[i];

    const indexA = circuitIndex[nodeA];
    const indexB = circuitIndex[nodeB];
    if (indexA === indexB) continue;

    const circuitA = circuits[indexA];
    const circuitB = circuits[indexB];

    for (const node of circuitB) {
      circuitA.push(node);
      circuitIndex[node] = indexA;
    }
    circuitB.length = 0;
  }

  circuits.sort((a, b) => b.length - a.length);

  const count = circuits[0].length * circuits[1].length * circuits[2].length;

  return count;
}

// --------------------------------------------------------

const day08Two = (fileInput) => {
  const coords = getCoords(fileInput);
  const coordsLength = coords.length;

  const circuits = Array.from({ length: coordsLength }, (_, i) => [i]);
  const circuitIndex = Array.from({ length: coordsLength }, (_, i) => i);

  const nodes = getEdges(coords);

  let circuitsLeft = circuits.length;

  for (const [nodeA, nodeB] of nodes) {
    const indexA = circuitIndex[nodeA];
    const indexB = circuitIndex[nodeB];

    if (indexA != indexB) {
      if (circuitsLeft == 2) return coords[nodeA][0] * coords[nodeB][0];

      const circuitA = circuits[indexA];
      const circuitB = circuits[indexB];

      while (circuitB.length != 0) {
        circuitA.push(circuitB[0]);
        circuitIndex[circuitB[0]] = indexA;
        circuitB.splice(0, 1);
      }
      circuitsLeft--;
    }
  }
};

//const fileInput = './2025/day08/example.txt'; // 40 - 25272
const fileInput = './2025/day08/input.txt'; // 330786 - 3276581616

console.log(day08(fileInput));
console.log(day08Two(fileInput));
