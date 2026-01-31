import { NodeValue } from '../../../components/Node/Node';
import { getNeighbors, reconstructPath, findStartAndEnd, PriorityQueue, manhattanDistance } from '../pathfindingUtils';

/**
 * A* Pathfinding Algorithm
 * Returns an object with:
 *    explorationSteps: array of arrays, each containing nodes explored at that step
 *    path: array of nodes from start to end (empty if no path found)
 * 
 * A* uses f(n) = g(n) + h(n) where:
 *   g(n) = actual cost from start to current node
 *   h(n) = heuristic estimate from current node to goal (Manhattan distance)
 */
export const astar = (nodes, gridSize) => {
  const { startNode, endNode } = findStartAndEnd(nodes);

  if (!startNode || !endNode) {
    return { explorationSteps: [], path: [] };
  }

  const gScore = new Map(); // Cost from start to node
  const fScore = new Map(); // Estimated total cost (g + h)
  const parentMap = new Map();
  const visited = new Set();
  const explorationSteps = [];
  const pq = new PriorityQueue();

  // Initialize scores
  nodes.forEach(node => {
    gScore.set(node.id, Infinity);
    fScore.set(node.id, Infinity);
  });

  gScore.set(startNode.id, 0);
  fScore.set(startNode.id, manhattanDistance(startNode, endNode));

  pq.enqueue(startNode, fScore.get(startNode.id));

  while (!pq.isEmpty()) {
    const current = pq.dequeue();

    if (visited.has(current.id)) continue;
    visited.add(current.id);

    const currentStep = [];

    // Check if we've reached the goal
    if (current.id === endNode.id) {
      return {
        explorationSteps,
        path: reconstructPath(parentMap, current),
      };
    }

    // Add current node to visualization (if not start/end)
    if (current.value !== NodeValue.START && current.value !== NodeValue.END) {
      currentStep.push(current);
    }

    const neighbors = getNeighbors(current, nodes, gridSize);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.id)) {
        const tentativeGScore = gScore.get(current.id) + 1; // weight = 1 for all edges

        if (tentativeGScore < gScore.get(neighbor.id)) {
          // This is a better path
          parentMap.set(neighbor.id, current);
          gScore.set(neighbor.id, tentativeGScore);
          fScore.set(neighbor.id, tentativeGScore + manhattanDistance(neighbor, endNode));
          pq.enqueue(neighbor, fScore.get(neighbor.id));
        }
      }
    }

    if (currentStep.length > 0) {
      explorationSteps.push(currentStep);
    }
  }

  // No path found
  return { explorationSteps, path: [] };
};

export default astar;
