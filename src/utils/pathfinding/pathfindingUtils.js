import { NodeValue } from '../../components/Node/Node';

/**
 * Get valid neighboring nodes (up, down, left, right)
 */
export const getNeighbors = (node, nodes, gridSize) => {
  const { x, y } = node;
  const directions = [
    { dx: 0, dy: -1 }, // up
    { dx: 0, dy: 1 },  // down
    { dx: -1, dy: 0 }, // left
    { dx: 1, dy: 0 },  // right
  ];

  const neighbors = [];
  for (const { dx, dy } of directions) {
    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
      const neighbor = nodes.find(n => n.x === newX && n.y === newY);
      if (neighbor && neighbor.value !== NodeValue.BLOCKED) {
        neighbors.push(neighbor);
      }
    }
  }

  return neighbors;
};

/**
 * Reconstruct path from end node to start using parent map
 */
export const reconstructPath = (parentMap, endNode) => {
  const path = [];
  let current = endNode;

  while (current) {
    path.unshift(current);
    current = parentMap.get(current.id);
  }

  return path;
};

/**
 * Find start and end nodes in the grid
 */
export const findStartAndEnd = (nodes) => {
  const startNode = nodes.find(n => n.value === NodeValue.START);
  const endNode = nodes.find(n => n.value === NodeValue.END);
  return { startNode, endNode };
};

/**
 * Simple priority queue implementation using a sorted array
 */
export class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(node, priority) {
    const element = { node, priority };
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (element.priority < this.items[i].priority) {
        this.items.splice(i, 0, element);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(element);
    }
  }

  dequeue() {
    return this.items.shift()?.node;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

/**
 * Manhattan distance heuristic (best for grid-based movement without diagonals)
 */
export const manhattanDistance = (nodeA, nodeB) => {
  return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
};
