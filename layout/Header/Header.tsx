import React from 'react';

import { HeaderProps } from './HeaderProps';
import styles from './Header.module.css';

export const Header = ({ ...props }: HeaderProps) => {
  return <div {...props}>Header</div>;
};
