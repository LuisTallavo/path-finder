import { NodeValue } from '../Node/Node';

export const getNodeColor = (value) => {
  switch (value) {
    case NodeValue.BLOCKED:
      return '#374151';
    case NodeValue.VISITED:
      return '#93c5fd';
    case NodeValue.EXPLORING:
      return '#a78bfa';
    case NodeValue.START:
    case NodeValue.END:
      return 'transparent';
    case NodeValue.PATH:
      return '#22c55e';
    default:
      return '#ffffff';
  }
};

// util function to let users draw obstacles on mouse down
export const handleMouseDown = (
  node,
  setIsDrawing,
  onNodeUpdate
) => {
  if (node.value === NodeValue.START || node.value === NodeValue.END) return; // avoid drawing obstacles on start/end nodes

  setIsDrawing(true);

  if (node.value === NodeValue.BLOCKED) {
    onNodeUpdate(node.x, node.y, NodeValue.EMPTY); // remove previous obstacles
  } else {
    onNodeUpdate(node.x, node.y, NodeValue.BLOCKED); // update node status to blocked when drawing obstacles
  }
};

// util function to let users draw obstacles on mouse enter 
export const handleMouseEnter = (
  node,
  isDrawing,
  onNodeUpdate
) => {
  if (node.value === NodeValue.START || node.value === NodeValue.END) return;

  if (isDrawing && node.value !== NodeValue.BLOCKED) {
    onNodeUpdate(node.x, node.y, NodeValue.BLOCKED);
  }
};

// end drawing obstacles on mouse up
export const handleMouseUp = (setIsDrawing) => () => {
  setIsDrawing(false);
};

// drag start and end nodes to change location
export const handleDragStart = (e, node, draggedNodeRef) => {
  if (node.value !== NodeValue.START && node.value !== NodeValue.END) {
    e.preventDefault();
    return;
  }
  draggedNodeRef.current = node;
  e.dataTransfer.effectAllowed = 'move';
};

export const handleDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

export const handleDrop = (e, targetNode, draggedNodeRef, onNodeDrop) => {
  e.preventDefault();
  
  const draggedNode = draggedNodeRef.current;
  if (!draggedNode) return;
  if (targetNode.value === NodeValue.START || targetNode.value === NodeValue.END) return;
  
  onNodeDrop(draggedNode.x, draggedNode.y, targetNode.x, targetNode.y);
  draggedNodeRef.current = null;
};
