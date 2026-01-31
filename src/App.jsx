import { useState, useRef } from 'react';
import Header from './components/Header/Header';
import Grid from './components/Grid/Grid';
import PathNotFoundModal from './components/PathNotFoundModal/PathNotFoundModal';
import { PathNode, NodeValue } from './components/Node/Node';
import { bfs } from './utils/pathfinding/bfs/bfs';
import { dfs } from './utils/pathfinding/dfs/dfs';
import { dijkstra } from './utils/pathfinding/dijkstra/dijkstra';
import { astar } from './utils/pathfinding/astar/astar';
import styled from 'styled-components';

const PATH_INTERVAL = 15; // ms between path animation steps
const INITIAL_GRID_SIZE = 30; // initial grid size

// Algorithm configurations with their exploration intervals
const ALGORITHMS = {
  bfs: { fn: bfs, explorationInterval: 50 },
  dfs: { fn: dfs, explorationInterval: 5 },
  dijkstra: { fn: dijkstra, explorationInterval: 25 },
  astar: { fn: astar, explorationInterval: 25 },
};

const StyledApp = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
  background-color: #f5f5f5;
  align-items: center;
`;

const getStartPosition = (size) => ({
  x: Math.floor(size * 0.2),
  y: Math.floor(size * 0.8),
});

const getEndPosition = (size) => ({
  x: Math.floor(size * 0.8),
  y: Math.floor(size * 0.2),
});

const createNodes = (size) => {
  const start = getStartPosition(size);
  const end = getEndPosition(size);
  
  return Array(size).fill().map((_, y) =>
    Array(size).fill().map((_, x) => {
      let value = NodeValue.EMPTY;
      if (x === start.x && y === start.y) {
        value = NodeValue.START;
      } else if (x === end.x && y === end.y) {
        value = NodeValue.END;
      }
      return new PathNode(x, y, value);
    })
  ).flat();
};

const clearVisualization = (nodes) => {
  return nodes.map(node => {
    if (node.value === NodeValue.VISITED || node.value === NodeValue.EXPLORING || node.value === NodeValue.PATH) {
      return new PathNode(node.x, node.y, NodeValue.EMPTY);
    }
    return node;
  });
};

const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bfs');
  const [gridSize, setGridSize] = useState(INITIAL_GRID_SIZE);
  const [nodes, setNodes] = useState(() => createNodes(INITIAL_GRID_SIZE));
  const [isRunning, setIsRunning] = useState(false);
  const timeoutsRef = useRef([]);
  const [noPathFoundModal, setNoPathFoundModal] = useState(false);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const handleGridSizeChange = (newSize) => {
    clearTimeouts();
    setIsRunning(false);
    setGridSize(newSize);
    setNodes(createNodes(newSize));
  };

  const handleClear = () => {
    clearTimeouts();
    setIsRunning(false);
    setNodes(createNodes(gridSize));
  };

   // Visualize exploration steps for path finding algorithm
   const visualizeExploration = (explorationSteps, path, explorationInterval) => {
    let stepIndex = 0;

    const animateStep = () => {
      if (stepIndex >= explorationSteps.length) {
        visualizePath(path);
        return;
      }

      const currentStepNodes = explorationSteps[stepIndex];
      
      if (!currentStepNodes) {
        visualizePath(path);
        return;
      }

      setNodes(prevNodes => {
        const newNodes = [...prevNodes];
        const exploringIds = new Set(currentStepNodes.map(n => n.id));
        
        newNodes.forEach((node, idx) => {
          if (exploringIds.has(node.id) && node.value !== NodeValue.START && node.value !== NodeValue.END) {
            // New exploring node, mark it as exploring (purple)
            newNodes[idx] = new PathNode(node.x, node.y, NodeValue.EXPLORING);
          } else if (node.value === NodeValue.EXPLORING) {
            // Previously explored node, mark it as visited (blue)
            newNodes[idx] = new PathNode(node.x, node.y, NodeValue.VISITED);
          }
        });

        return newNodes;
      });

      stepIndex += 1;
      const timeoutId = setTimeout(animateStep, explorationInterval);
      timeoutsRef.current.push(timeoutId);
    };

    animateStep();
  };

  const visualizePath = (path) => {
    // Clear all visited/exploring nodes first
    setNodes(clearVisualization);

    let pathIndex = 0;

    const animatePath = () => {
      if (pathIndex >= path.length) {
        setIsRunning(false);
        return;
      }

      const pathNode = path[pathIndex];
      
      setNodes(prevNodes => {
        const newNodes = [...prevNodes];
        const idx = newNodes.findIndex(n => n.id === pathNode.id);
        
        if (idx !== -1 && newNodes[idx].value !== NodeValue.START && newNodes[idx].value !== NodeValue.END) {
          newNodes[idx] = new PathNode(pathNode.x, pathNode.y, NodeValue.PATH);
        }
        
        return newNodes;
      });

      pathIndex++;
      const timeoutId = setTimeout(animatePath, PATH_INTERVAL);
      timeoutsRef.current.push(timeoutId);
    };

    // Small delay before showing path
    const timeoutId = setTimeout(animatePath, 200);
    timeoutsRef.current.push(timeoutId);
  };

  const handleStart = () => {
    if (isRunning) return;

    // Clear previous visualization
    clearTimeouts();
    setNodes(clearVisualization);

    setIsRunning(true);

    // Look up algorithm based on users selection
    const { fn: algorithm, explorationInterval } = ALGORITHMS[selectedAlgorithm];
    const { explorationSteps, path } = algorithm(nodes, gridSize);

    if (path.length === 0) {
      setNoPathFoundModal(true);
      setIsRunning(false);
      return;
    }

    visualizeExploration(explorationSteps, path, explorationInterval);
  };

  const handleNodeUpdate = (x, y, newState) => {
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.x === x && node.y === y 
          ? new PathNode(x, y, newState)
          : node
      )
    );
  };

  // used to drag and drop start/end nodes to new locations
  const handleNodeDrop = (fromX, fromY, toX, toY) => {
    setNodes(prevNodes => {
      const fromNode = prevNodes.find(n => n.x === fromX && n.y === fromY);
      const toNode = prevNodes.find(n => n.x === toX && n.y === toY);
      
      if (!fromNode || !toNode) return prevNodes;
      if (toNode.value === NodeValue.START || toNode.value === NodeValue.END) return prevNodes;
      
      const draggedValue = fromNode.value;
      
      return prevNodes.map(node => {
        if (node.x === fromX && node.y === fromY) {
          return new PathNode(node.x, node.y, NodeValue.EMPTY);
        }
        if (node.x === toX && node.y === toY) {
          return new PathNode(node.x, node.y, draggedValue);
        }
        return node;
      });
    });
  };

  return (
    <StyledApp>
      <Header
        selectedAlgorithm={selectedAlgorithm}
        onAlgorithmChange={setSelectedAlgorithm}
        gridSize={gridSize}
        onGridSizeChange={handleGridSizeChange}
        onStart={handleStart}
        onClear={handleClear}
      />
      <Grid 
        nodes={nodes} 
        gridSize={gridSize} 
        onNodeUpdate={handleNodeUpdate}
        onNodeDrop={handleNodeDrop}
      />
      <PathNotFoundModal
        open={noPathFoundModal}
        onClose={() => setNoPathFoundModal(false)}
      />
    </StyledApp>
  );
};

export default App;
