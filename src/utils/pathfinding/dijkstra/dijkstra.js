import { NodeValue } from '../../../components/Node/Node';
import { getNeighbors, reconstructPath, findStartAndEnd, PriorityQueue } from '../pathfindingUtils';

/**
 * Dijkstra's Pathfinding Algorithm
 * Returns an object with:
 *    explorationSteps: array of arrays, each containing nodes explored at that step
 *    path: array of nodes from start to end (empty if no path found)
 * 
 * Note: In an unweighted grid, Dijkstra's behaves similarly to BFS.
 * All edges have weight 1 in this implementation.
 */
export const dijkstra = (nodes, gridSize) => {
  const { startNode, endNode } = findStartAndEnd(nodes);

  if (!startNode || !endNode) {
    return { explorationSteps: [], path: [] };
  }

  const distances = new Map();
  const parentMap = new Map();
  const visited = new Set();
  const explorationSteps = [];
  const pq = new PriorityQueue();

  // Initialize distances
  nodes.forEach(node => {
    distances.set(node.id, Infinity);
  });
  distances.set(startNode.id, 0);

  pq.enqueue(startNode, 0);

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
        const newDistance = distances.get(current.id) + 1; // weight = 1 for all edges

        if (newDistance < distances.get(neighbor.id)) {
          distances.set(neighbor.id, newDistance);
          parentMap.set(neighbor.id, current);
          pq.enqueue(neighbor, newDistance);
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

export default dijkstra;
