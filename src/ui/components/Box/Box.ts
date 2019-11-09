import styled from 'styled-components';
import {
  minWidth,
  width,
  height,
  space,
  textAlign,
  color,
  border,
  borderColor,
  borderWidth,
  borderRadius,
  borderStyle,
  boxShadow,
  borderRight
} from 'styled-system';
import { BoxProps } from './BoxProps';

export const Box = styled.div<BoxProps>(
  minWidth,
  width,
  height,
  textAlign,
  space,
  border,
  borderRight,
  borderWidth,
  borderColor,
  borderRadius,
  borderStyle,
  color,
  boxShadow,
  {
    boxSizing: 'border-box'
  }
);
