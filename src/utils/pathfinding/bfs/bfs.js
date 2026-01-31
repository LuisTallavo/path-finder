import { NodeValue } from '../../../components/Node/Node';
import { getNeighbors, reconstructPath, findStartAndEnd } from '../pathfindingUtils';

/**
 * BFS Pathfinding Algorithm
 * Returns an object with:
 *    explorationSteps: array of arrays, each containing nodes explored at that level/step
 *    path: array of nodes from start to end (empty if no path found)
 */
export const bfs = (nodes, gridSize) => {
  const { startNode, endNode } = findStartAndEnd(nodes);

  if (!startNode || !endNode) {
    return { explorationSteps: [], path: [] };
  }

  const queue = [startNode];
  const visited = new Set([startNode.id]);
  const parentMap = new Map();
  const explorationSteps = [];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const current = queue.shift();

      // Check if we've reached the goal
      if (current.id === endNode.id) {
        return {
          explorationSteps,
          path: reconstructPath(parentMap, current),
        };
      }

      const neighbors = getNeighbors(current, nodes, gridSize);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor.id)) {
          visited.add(neighbor.id);
          parentMap.set(neighbor.id, current);
          queue.push(neighbor);

          // Don't add start/end nodes to visualization
          if (neighbor.value !== NodeValue.START && neighbor.value !== NodeValue.END) {
            currentLevel.push(neighbor);
          }
        }
      }
    }

    if (currentLevel.length > 0) {
      explorationSteps.push(currentLevel);
    }
  }

  // No path found
  return { explorationSteps, path: [] };
};

export default bfs;
