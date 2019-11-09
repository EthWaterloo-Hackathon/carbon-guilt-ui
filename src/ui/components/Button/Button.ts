import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { styles } from '../../styles';

export type variants = 'primary' | 'secondary';
type HtmlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type Props = HtmlButtonProps & {
  variant?: variants;
};

export const Button = styled.button.attrs(props => ({ primary: false }))`
  /* Adapt the colors based on primary prop */
  background: ${props => (props.primary ? styles.colors.main : 'white')};
  color: ${props => (props.primary ? 'white' : styles.colors.main)};

  font-size: 1em;
  padding: 0.5em 1em;
  border: 2px solid ${styles.colors.main};
  border-radius: 8px;
`;
