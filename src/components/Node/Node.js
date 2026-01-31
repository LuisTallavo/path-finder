export const NodeValue = {
  EMPTY: 'empty',
  BLOCKED: 'blocked',
  VISITED: 'visited',
  EXPLORING: 'exploring',
  START: 'start',
  END: 'end',
  PATH: 'path',
};

// PathNode represents a single cell in the grid.
export class PathNode {
  constructor(x, y, value = NodeValue.EMPTY) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.id = `${x}-${y}`;
  }
}
