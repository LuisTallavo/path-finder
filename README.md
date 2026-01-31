# Path Finding Visualizer!

Check it out here: https://luistallavo.github.io/path-finder/

An interactive visualization tool for exploring pathfinding algorithms. Built as a personal learning project to deepen my understanding of fundamental path finding algorithms and data structures.

This project was built to gain hands-on experience with:

- **Graph traversal algorithms** — BFS, DFS, Dijkstra's, and A* Search
- **React state management** — managing complex, frequently-updating UI state
- **Asynchronous animations** — coordinating timed visual updates using JavaScript timeouts
- **Modern React patterns and Libraries** — hooks, components, ant design, styled components

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![Ant Design](https://img.shields.io/badge/Ant%20Design-6.2-0170FE?logo=antdesign)
![Styled Components](https://img.shields.io/badge/Styled%20Components-6.3-DB7093?logo=styledcomponents)

## How it works

- **4 Pathfinding Algorithms Available**: BFS, DFS, Dijkstra's, and A* Search
- **Interactive Grid**: Adjustable grid size (10x10, 20x20, 30x30, or 50x50), change the grid size by using the header dropdown. You can also draw obstacles by clicking and dragging across the grid.
- **Drag & Drop Start/End Points**: Simply drag and drop the start point and the target to change where in the grid the path finding algorithm will navigate to.
- **Step-by-Step Path Finding Visualization**: Start the visualization and see how the algorithm explores each step in its search.
- **Path Animation**: See the final path animate after exploration completes, showing the path from the start to the end goal.

### Data Structures

| Structure | Used In | Purpose |
|-----------|---------|----------|
| **Queue** | BFS | FIFO exploration order |
| **Stack** | DFS | LIFO exploration order |
| **Priority Queue** | Dijkstra's, A* | Extract minimum cost node |
| **Map** | All algorithms | O(1) parent tracking for path reconstruction |
| **Set** | All algorithms | O(1) visited node lookup |
| **2D Grid (flattened)** | Grid component | Efficient node storage and access |
