import { NodeValue } from '../../../components/Node/Node';
import { getNeighbors, reconstructPath, findStartAndEnd } from '../pathfindingUtils';

/**
 * DFS Pathfinding Algorithm
 * Returns an object with:
 *    explorationSteps: array of arrays, each containing nodes explored at that step
 *    path: array of nodes from start to end (empty if no path found)
 */
export const dfs = (nodes, gridSize) => {
  const { startNode, endNode } = findStartAndEnd(nodes);

  if (!startNode || !endNode) {
    return { explorationSteps: [], path: [] };
  }

  const stack = [startNode];
  const visited = new Set([startNode.id]);
  const parentMap = new Map();
  const explorationSteps = [];

  while (stack.length > 0) {
    const current = stack.pop();
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
        visited.add(neighbor.id);
        parentMap.set(neighbor.id, current);
        stack.push(neighbor);
      }
    }

    if (currentStep.length > 0) {
      explorationSteps.push(currentStep);
    }
  }

  // No path found
  return { explorationSteps, path: [] };
};

export default dfs;
