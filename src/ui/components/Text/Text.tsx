import React, { FC } from 'react';
import styled from 'styled-components';
import {
  color,
  ColorProps,
  fontFamily,
  FontFamilyProps,
  fontWeight,
  FontWeightProps,
  lineHeight,
  LineHeightProps,
  fontSize,
  FontSizeProps,
  letterSpacing,
  LetterSpacingProps,
  variant
} from 'styled-system';
import { Box } from '../Box';

type BoxProps = React.ComponentProps<typeof Box>;

export type Props = {
  bold?: boolean;
} & BoxProps &
  ColorProps &
  FontFamilyProps &
  FontWeightProps &
  FontSizeProps &
  LineHeightProps &
  LetterSpacingProps;

export const TextComponent = styled(Box)<Props>(
  color,
  fontFamily,
  fontWeight,
  lineHeight,
  fontSize,
  letterSpacing,
  props => ({
    ...(props.bold && fontWeight({ ...props, fontWeight: 'bold' })),
    overflowWrap: 'break-word'
  })
);

export const TextDocz: FC<Props> = (props: any) => {
  return <TextComponent {...props} />;
};

TextComponent.defaultProps = {
  as: 'span',
  fontSize: '1rem'
};

export const Text = Object.assign(TextComponent, {
  defaultProps: TextComponent.defaultProps
});
