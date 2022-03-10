import React from 'react';
import cn from 'classnames';

import { SidebarProps } from './SidebarProps';
import { Menu } from '..';

import Logo from '../logo.svg';
import styles from './Sidebar.module.css';
import { Search } from '../../components';

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo}/>
      <Search />
      <Menu />
    </div>
  );
};
