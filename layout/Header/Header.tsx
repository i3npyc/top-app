import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import cn from 'classnames';

import { HeaderProps } from './HeaderProps';

import { ButtonIcon } from '../../components';
import { Sidebar } from '../Sidebar/Sidebar';

import Logo from '../logo.svg';
import styles from './Header.module.css';

export const Header = ({ className, ...props }: HeaderProps) => {
  const [isOpend, setIsOpend] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpend(false);
  }, [router])

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20
      }
    },
    closed: {
      opacity: 0,
      x: '100%',
    }
  }

  const openMenu = () => {
    setIsOpend(true);
  };

  const closeMenu = () => {
    setIsOpend(false);
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo />
      <ButtonIcon appearance="white" icon="burger" onClick={openMenu} />
      <motion.div className={styles.mobileMenu} variants={variants} initial={'closed'} animate={isOpend ? 'opened' : 'closed'}>
        <Sidebar />
        <ButtonIcon
          className={styles.menuClose}
          appearance="white"
          icon="close"
          onClick={closeMenu}
        />
      </motion.div>
    </header>
  );
};
