import React from 'react';
import cn from 'classnames';

import { SidebarProps } from './SidebarProps';
import { Menu } from '..';

import Logo from '../logo.svg';
import styles from './Sidebar.module.css';
import { Search } from '../../components';
import Link from 'next/link';

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Link href={'/'}>
        <a>
          <Logo className={styles.logo} />
        </a>
      </Link>
      <Search />
      <Menu />
    </div>
  );
};
