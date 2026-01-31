# 🧭 Path Finding Visualizer

An interactive visualization tool for exploring and understanding pathfinding algorithms. Built as a personal learning project to deepen my understanding of fundamental computer science algorithms, data structures, and modern React development practices.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![Ant Design](https://img.shields.io/badge/Ant%20Design-6.2-0170FE?logo=antdesign)
![Styled Components](https://img.shields.io/badge/Styled%20Components-6.3-DB7093?logo=styledcomponents)

## 🎯 Project Purpose

This project was built to gain hands-on experience with:

- **Graph traversal algorithms** — implementing and visualizing how different pathfinding strategies explore a grid
- **Algorithm complexity** — understanding time/space trade-offs between BFS, DFS, Dijkstra's, and A*
- **React state management** — managing complex, frequently-updating UI state
- **Asynchronous animations** — coordinating timed visual updates using JavaScript timeouts
- **Modern React patterns** — hooks, component composition, and CSS-in-JS styling

## ✨ Features

- **4 Pathfinding Algorithms**: BFS, DFS, Dijkstra's, and A* Search
- **Interactive Grid**: Draw obstacles by clicking and dragging
- **Drag & Drop**: Reposition start and end points
- **Adjustable Grid Size**: 10x10, 20x20, 30x30, or 50x50
- **Step-by-Step Visualization**: Watch algorithms explore the grid in real-time
- **Path Animation**: See the final path animate after exploration completes

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/path-finder.git
cd path-finder

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🧠 Algorithms Implemented

### Breadth-First Search (BFS)

**Exploration Pattern**: Level-by-level (radiates outward)

BFS explores all nodes at the current depth before moving to nodes at the next depth level. It uses a **queue** (FIFO) data structure.

**Key characteristics:**
- ✅ Guarantees shortest path in unweighted graphs
- ✅ Complete (will find a solution if one exists)
- ⏱️ Time Complexity: O(V + E)
- 💾 Space Complexity: O(V)

```javascript
const queue = [startNode];
while (queue.length > 0) {
  const current = queue.shift(); // FIFO - dequeue from front
  // Process neighbors and add to back of queue
}
```

### Depth-First Search (DFS)

**Exploration Pattern**: Deep dive (follows one path to its end)

DFS explores as far as possible along each branch before backtracking. It uses a **stack** (LIFO) data structure.

**Key characteristics:**
- ❌ Does NOT guarantee shortest path
- ✅ Memory efficient for deep graphs
- ⏱️ Time Complexity: O(V + E)
- 💾 Space Complexity: O(V) worst case, O(depth) for balanced graphs

```javascript
const stack = [startNode];
while (stack.length > 0) {
  const current = stack.pop(); // LIFO - pop from top
  // Process neighbors and push to top of stack
}
```

### Dijkstra's Algorithm

**Exploration Pattern**: Expands by cumulative cost (greedy)

Dijkstra's algorithm finds the shortest path by always expanding the node with the lowest cumulative distance from the start. Uses a **priority queue** ordered by distance.

**Key characteristics:**
- ✅ Guarantees shortest path (even in weighted graphs)
- ✅ Optimal for graphs with non-negative weights
- ⏱️ Time Complexity: O((V + E) log V) with priority queue
- 💾 Space Complexity: O(V)

```javascript
const pq = new PriorityQueue();
pq.enqueue(startNode, 0);

while (!pq.isEmpty()) {
  const current = pq.dequeue(); // Get lowest distance node
  // Update distances for neighbors
}
```

### A* Search Algorithm

**Exploration Pattern**: Guided by heuristic (informed search)

A* combines Dijkstra's actual cost with a heuristic estimate to the goal. Uses the formula `f(n) = g(n) + h(n)` where:
- `g(n)` = actual cost from start to current node
- `h(n)` = estimated cost from current node to goal (Manhattan distance)

**Key characteristics:**
- ✅ Guarantees shortest path (with admissible heuristic)
- ✅ More efficient than Dijkstra's (explores fewer nodes)
- ⏱️ Time Complexity: O(E) in best case, O(V²) worst case
- 💾 Space Complexity: O(V)

```javascript
const manhattanDistance = (a, b) => 
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

fScore.set(node.id, gScore + manhattanDistance(node, endNode));
```

## 🏗️ Technical Skills & Concepts

### Data Structures

| Structure | Used In | Purpose |
|-----------|---------|----------|
| **Queue** | BFS | FIFO exploration order |
| **Stack** | DFS | LIFO exploration order |
| **Priority Queue** | Dijkstra's, A* | Extract minimum cost node |
| **Map** | All algorithms | O(1) parent tracking for path reconstruction |
| **Set** | All algorithms | O(1) visited node lookup |
| **2D Grid (flattened)** | Grid component | Efficient node storage and access |

### React Concepts

#### State Management with Hooks

```javascript
// Complex state for grid nodes
const [nodes, setNodes] = useState(() => createNodes(INITIAL_GRID_SIZE));

// Functional updates for performance
setNodes(prevNodes => prevNodes.map(node => /* transform */));
```

#### useRef for Mutable Values

```javascript
// Store timeout IDs without triggering re-renders
const timeoutsRef = useRef([]);

// Store dragged node reference
const draggedNodeRef = useRef(null);
```

#### Component Composition

The project follows a modular component structure:

```
src/
├── components/
│   ├── Grid/           # Main grid display
│   ├── Header/         # Controls and algorithm selection
│   ├── Node/           # Grid cell components
│   └── PathNotFoundModal/
├── utils/
│   └── pathfinding/    # Algorithm implementations
└── App.jsx             # Root component & state orchestration
```

### CSS-in-JS with Styled Components

```javascript
const GridNode = styled.div`
  background-color: ${props => getNodeColor(props.$value)};
  transition: background-color 0.05s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;
```

**Techniques used:**
- **Transient props** (`$value`) to prevent DOM attribute leakage
- **Dynamic styling** based on component state
- **CSS transitions** for smooth visual feedback
- **CSS Grid** for responsive grid layout

### Asynchronous Animation with setTimeout

One of the key challenges was creating smooth, step-by-step visualizations:

```javascript
const visualizeExploration = (explorationSteps, path, explorationInterval) => {
  let stepIndex = 0;

  const animateStep = () => {
    if (stepIndex >= explorationSteps.length) {
      visualizePath(path);
      return;
    }

    // Update state for current step
    setNodes(prevNodes => { /* ... */ });

    stepIndex += 1;
    const timeoutId = setTimeout(animateStep, explorationInterval);
    timeoutsRef.current.push(timeoutId); // Track for cleanup
  };

  animateStep();
};
```

**Key learnings:**
- **Recursive setTimeout** vs setInterval for variable timing
- **Cleanup patterns** to prevent memory leaks and state updates after unmount
- **Coordinating multiple animation phases** (exploration → path)

### Event Handling Patterns

#### Drag and Drop (HTML5 API)

```javascript
draggable={node.value === NodeValue.START || node.value === NodeValue.END}
onDragStart={(e) => handleDragStart(e, node, draggedNodeRef)}
onDragOver={handleDragOver}
onDrop={(e) => handleDrop(e, node, draggedNodeRef, onNodeDrop)}
```

#### Drawing with Mouse Events

```javascript
onMouseDown={() => handleMouseDown(node, setIsDrawing, onNodeUpdate)}
onMouseEnter={() => handleMouseEnter(node, isDrawing, onNodeUpdate)}
onMouseUp={handleMouseUp(setIsDrawing)}
```

### Ant Design Integration

Used for UI components:
- **Select** — Algorithm and grid size dropdowns
- **Button** — Action buttons with custom styling
- **Modal** — Path not found notification

```javascript
import { Select, Button, Modal } from 'antd';

// Custom styled Ant Design button
const VisualizeButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;
```

### Build Tools

#### Vite

- **Fast HMR** (Hot Module Replacement) for rapid development
- **ES Modules** for modern JavaScript support
- **Optimized builds** with automatic code splitting

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
});
```

## 📁 Project Structure

```
path-finder/
├── src/
│   ├── assets/               # SVG icons for start/end nodes
│   ├── components/
│   │   ├── Grid/
│   │   │   ├── Grid.jsx      # Grid container & rendering
│   │   │   └── Grid.util.js  # Event handlers & color mapping
│   │   ├── Header/
│   │   │   ├── Header.jsx    # Controls UI
│   │   │   └── Header.const.js # Options configuration
│   │   ├── Node/
│   │   │   ├── Node.js       # PathNode class & NodeValue enum
│   │   │   ├── Node.style.js # Shared styled components
│   │   │   ├── StartNode.jsx # Start marker component
│   │   │   └── EndNode.jsx   # End marker component
│   │   └── PathNotFoundModal/
│   │       └── PathNotFoundModal.jsx
│   ├── utils/
│   │   └── pathfinding/
│   │       ├── pathfindingUtils.js  # Shared utilities
│   │       ├── bfs/bfs.js
│   │       ├── dfs/dfs.js
│   │       ├── dijkstra/dijkstra.js
│   │       └── astar/astar.js
│   ├── App.jsx               # Main application component
│   └── main.jsx              # React entry point
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Visual States

| State | Color | Description |
|-------|-------|-------------|
| Empty | White (`#ffffff`) | Unvisited, passable cell |
| Blocked | Dark Gray (`#374151`) | Obstacle (impassable) |
| Exploring | Purple (`#a78bfa`) | Currently being evaluated |
| Visited | Light Blue (`#93c5fd`) | Previously explored |
| Path | Green (`#22c55e`) | Final shortest path |

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📚 Key Learnings

1. **Algorithm Visualization** — Breaking down algorithms into discrete steps that can be animated helps understand their behavior

2. **State Immutability** — React's state updates must be immutable; creating new `PathNode` instances instead of mutating existing ones

3. **Timeout Management** — Proper cleanup of timeouts is crucial to prevent memory leaks and stale state updates

4. **Separation of Concerns** — Keeping algorithm logic separate from UI components makes code more testable and maintainable

5. **Performance Considerations** — Using `Set` and `Map` for O(1) lookups instead of array methods like `find()` in hot paths

## 🙏 Acknowledgments

This project was inspired by various pathfinding visualizers and educational resources on graph algorithms. Built as a learning exercise to solidify understanding of fundamental CS concepts.

---

**Built with ❤️ using React, Vite, and curiosity**
