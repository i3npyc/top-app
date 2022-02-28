import React from 'react';

import { SidebarProps } from './SidebarProps';
import styles from './Sidebar.module.css';

export const Sidebar = ({ ...props }: SidebarProps) => {
  return <div {...props}>Sidebar</div>;
};
