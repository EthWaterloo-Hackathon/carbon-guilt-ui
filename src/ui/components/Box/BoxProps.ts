import {
  MinWidthProps,
  MaxWidthProps,
  WidthProps,
  HeightProps,
  SpaceProps,
  TextAlignProps,
  ColorProps,
  BorderProps,
  BorderColorProps,
  BorderWidthProps,
  BorderRadiusProps,
  BoxShadowProps,
  BorderRightProps
} from 'styled-system';
export type BoxProps = MinWidthProps &
  MaxWidthProps &
  WidthProps &
  HeightProps &
  SpaceProps &
  ColorProps &
  BorderProps &
  BorderColorProps &
  BorderWidthProps &
  BorderRadiusProps &
  BorderRightProps &
  TextAlignProps &
  BoxShadowProps;
