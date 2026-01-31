import { useState, useRef } from 'react';
import styled from 'styled-components';
import { NodeValue } from '../Node/Node';
import {
  getNodeColor,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  handleDragStart,
  handleDragOver,
  handleDrop,
} from './Grid.util';
import StartNode from '../Node/StartNode';
import EndNode from '../Node/EndNode';

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  width: 80vw;
  height: 80vh;
`;

const GridWrapper = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  border: 2px solid #e0e0e0;
  grid-template-columns: ${props => `repeat(${props.$gridSize}, 1fr)`};
  grid-template-rows: ${props => `repeat(${props.$gridSize}, 1fr)`};
`;

const GridNode = styled.div`
  position: relative;
  border: ${props => (props.$value === NodeValue.START || props.$value === NodeValue.END) ? 'none' : '1px solid #e5e7eb'};
  background-color: ${props => getNodeColor(props.$value)};
  transition: background-color 0.05s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;


const Grid = ({ nodes, gridSize, onNodeUpdate, onNodeDrop }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const draggedNodeRef = useRef(null);

  return (
    <GridContainer onMouseUp={handleMouseUp(setIsDrawing)} onMouseLeave={handleMouseUp(setIsDrawing)}>
      <GridWrapper $gridSize={gridSize}>
        {nodes.map((node) => (
          <GridNode
            key={node.id}
            $value={node.value}
            $gridSize={gridSize}
            draggable={node.value === NodeValue.START || node.value === NodeValue.END}
            onDragStart={(e) => handleDragStart(e, node, draggedNodeRef)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, node, draggedNodeRef, onNodeDrop)}
            onMouseDown={() => handleMouseDown(node, setIsDrawing, onNodeUpdate)}
            onMouseEnter={() => handleMouseEnter(node, isDrawing, onNodeUpdate)}
          >
            {node.value === NodeValue.START && <StartNode />}
            {node.value === NodeValue.END && <EndNode />}
          </GridNode>
        ))}
      </GridWrapper>
    </GridContainer>
  );
}

export default Grid;
