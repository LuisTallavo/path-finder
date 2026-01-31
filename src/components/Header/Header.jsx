import React from 'react';
import { Select, Button } from 'antd';
import styled from 'styled-components';
import { algorithmOptions, gridSizeOptions } from './Header.const';

const HeaderWrapper = styled.header`
  width: 100%;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 80vw;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #2d3748;
  margin: 0;
  display: flex;
  align-items: center;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  align-items: flex-end;
`;

const ControlItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  color: #a0aec0;
  font-weight: 700;
  margin-bottom: 4px;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const ResetButton = styled(Button)`
  color: #718096;
  height: 40px;
`;

const VisualizeButton = styled(Button)`
  border-radius: 8px;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  height: 40px;
  min-width: 100px;
  
  &:hover {
    background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
  }
`;

const Header = ({ 
  selectedAlgorithm, 
  onAlgorithmChange, 
  gridSize, 
  onGridSizeChange, 
  onStart,
  onClear,
}) => {
  return (
    <HeaderWrapper>
      <InnerContainer>
        <Title>Path Finding Visualizer</Title>

        <ControlsContainer>
          <ControlItem>
            <Label>Algorithm</Label>
            <Select
              value={selectedAlgorithm}
              onChange={onAlgorithmChange}
              options={algorithmOptions}
              variant="filled"
            />
          </ControlItem>

          <ControlItem>
            <Label>Grid Size</Label>
            <Select
              value={gridSize}
              onChange={onGridSizeChange}
              options={gridSizeOptions}
              variant="filled"
            />
          </ControlItem>

          <ActionGroup>
            <ResetButton onClick={onClear} type="text">
              Reset
            </ResetButton>
            <VisualizeButton 
              type="primary" 
              onClick={onStart}
            >
              Visualize
            </VisualizeButton>
          </ActionGroup>
        </ControlsContainer>
      </InnerContainer>
    </HeaderWrapper>
  );
}

export default Header;