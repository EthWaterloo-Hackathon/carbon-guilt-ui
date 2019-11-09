import styled from 'styled-components';
import {
  gridGap,
  GridGapProps,
  gridAutoFlow,
  gridTemplateColumns,
  gridTemplateAreas,
  gridAutoColumns,
  gridAutoRows,
  alignItems,
  justifyItems,
  justifyContent,
  GridAutoFlowProps,
  GridTemplateColumnsProps,
  GridTemplateAreasProps,
  GridAutoColumnsProps,
  GridAutoRowsProps,
  AlignItemsProps,
  JustifyItemsProps,
  JustifyContentProps,
  PositionProps,
  MinHeightProps,
  minHeight,
  position
} from 'styled-system';

import { Box } from '../Box';
import { Item } from './Item';

export type GridProps = React.ComponentProps<typeof Box> &
  GridGapProps &
  GridAutoFlowProps &
  GridAutoFlowProps &
  GridTemplateColumnsProps &
  GridTemplateAreasProps &
  GridAutoColumnsProps &
  GridAutoRowsProps &
  AlignItemsProps &
  JustifyItemsProps &
  JustifyContentProps &
  PositionProps &
  MinHeightProps;

const GridComponent = styled(Box)<GridProps>(
  gridGap,
  gridAutoFlow,
  gridTemplateColumns,
  gridTemplateAreas,
  gridAutoColumns,
  gridAutoRows,
  alignItems,
  justifyContent,
  justifyItems,
  position,
  minHeight,
  {
    display: 'grid'
  }
);

export const Grid = Object.assign(GridComponent, {
  Item
});

Grid.defaultProps = {
  gridGap: 'gridGap'
};
