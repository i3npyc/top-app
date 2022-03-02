import React from 'react';

import { SidebarProps } from './SidebarProps';
import styles from './Sidebar.module.css';
import { Menu } from '..';

export const Sidebar = ({ ...props }: SidebarProps) => {
  return (
    <div {...props}>
      <Menu />
    </div>
  );
};
