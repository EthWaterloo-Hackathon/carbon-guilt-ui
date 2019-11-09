import styled from 'styled-components';
import {
  gridColumn,
  gridRow,
  gridArea,
  GridColumnProps,
  GridRowProps,
  GridAreaProps
} from 'styled-system';

import { Box } from '../../Box';

export type ItemProps = React.ComponentProps<typeof Box> &
  GridColumnProps &
  GridRowProps &
  GridAreaProps;

export const Item = styled(Box)<ItemProps>(gridColumn, gridRow, gridArea);
