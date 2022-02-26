import React from 'react';
import { TagProps } from './Tag.props';

export const Tag = ({
  children,
  color,
  size,
  ...props
}: TagProps): JSX.Element => {
  return <div {...props}>{children}</div>;
};
