/*

--- Day 23: LAN Party ---
As The Historians wander around a secure area at Easter Bunny HQ, you come across posters for a LAN party scheduled for today! Maybe you can find it; you connect to a nearby datalink port and download a map of the local network (your puzzle input).

The network map provides a list of every connection between two computers. For example:

kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn
Each line of text in the network map represents a single connection; the line kh-tc represents a connection between the computer named kh and the computer named tc. Connections aren't directional; tc-kh would mean exactly the same thing.

LAN parties typically involve multiplayer games, so maybe you can locate it by finding groups of connected computers. Start by looking for sets of three computers where each computer in the set is connected to the other two computers.

In this example, there are 12 such sets of three inter-connected computers:

aq,cg,yn
aq,vc,wq
co,de,ka
co,de,ta
co,ka,ta
de,ka,ta
kh,qp,ub
qp,td,wh
tb,vc,wq
tc,td,wh
td,wh,yn
ub,vc,wq
If the Chief Historian is here, and he's at the LAN party, it would be best to know that right away. You're pretty sure his computer's name starts with t, so consider only sets of three computers where at least one computer's name starts with t. That narrows the list down to 7 sets of three inter-connected computers:

co,de,ta
co,ka,ta
de,ka,ta
qp,td,wh
tb,vc,wq
tc,td,wh
td,wh,yn
Find all the sets of three inter-connected computers. How many contain at least one computer with a name that starts with t?

--- Part Two ---
There are still way too many results to go through them all. You'll have to find the LAN party another way and go there yourself.

Since it doesn't seem like any employees are around, you figure they must all be at the LAN party. If that's true, the LAN party will be the largest set of computers that are all connected to each other. That is, for each computer at the LAN party, that computer will have a connection to every other computer at the LAN party.

In the above example, the largest set of computers that are all connected to each other is made up of co, de, ka, and ta. Each computer in this set has a connection to every other computer in the set:

ka-co
ta-co
de-co
ta-ka
de-ta
ka-de
The LAN party posters say that the password to get into the LAN party is the name of every computer at the LAN party, sorted alphabetically, then joined together with commas. (The people running the LAN party are clearly a bunch of nerds.) In this example, the password would be co,de,ka,ta.

What is the password to get into the LAN party?

*/

import { _readInput } from '../../lib.js';

const getGraph = (fileInput) => {
  const graph = new Map();

  _readInput(fileInput).forEach((connection) => {
    const [node1, node2] = connection.split('-');
    if (!graph.has(node1)) graph.set(node1, []);
    if (!graph.has(node2)) graph.set(node2, []);
    graph.get(node1).push(node2);
    graph.get(node2).push(node1);
  });

  return graph;
};

const day23 = (fileInput) => {
  const graph = getGraph(fileInput);
  const trios = new Set();

  for (const [node, neighbors] of graph.entries()) {
    for (let i = 0; i < neighbors.length; i++) {
      for (let j = i + 1; j < neighbors.length; j++) {
        const neighborFirst = neighbors[i];
        const neighborLast = neighbors[j];
        if (graph.get(neighborFirst).includes(neighborLast)) {
          const trio = [node, neighborFirst, neighborLast].sort().join(',');
          trios.add(trio);
        }
      }
    }
  }

  return Array.from(trios).filter((trio) =>
    trio.split(',').some((name) => name.startsWith('t')),
  ).length;
};

// --------------------------------------------------------

const isClique = (nodes, graph) => {
  for (let i = 0; i < nodes.length; i++)
    for (let j = i + 1; j < nodes.length; j++)
      if (!graph.get(nodes[i]).includes(nodes[j])) return false;
  return true;
};

const findLargestClique = (
  nodes,
  graph,
  currentClique = [],
  start = 0,
  largestClique = [],
) => {
  if (currentClique.length > largestClique.length) {
    largestClique.length = 0;
    largestClique.push(...currentClique);
  }

  for (let i = start; i < nodes.length; i++) {
    const newClique = [...currentClique, nodes[i]];
    if (isClique(newClique, graph))
      findLargestClique(nodes, graph, newClique, i + 1, largestClique);
  }

  return largestClique;
};

function day23Two(fileInput) {
  const graph = getGraph(fileInput);
  return findLargestClique(Array.from(graph.keys()), graph).sort().join(',');
}

//const fileInput = './2024/day23/example.txt'; // 7 - co,de,ka,ta
const fileInput = './2024/day23/input.txt'; // 1173 - cm,de,ez,gv,hg,iy,or,pw,qu,rs,sn,uc,wq

console.log(day23(fileInput));
console.log(day23Two(fileInput));
