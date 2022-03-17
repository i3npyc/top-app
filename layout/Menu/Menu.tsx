import React, { KeyboardEvent, useContext, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';

import { AppContext } from '../../context/app.context';
import { firstLevelMenu } from '../../helpers/helpers';

import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';

import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion
        ? {}
        : {
            when: 'beforeChildren',
            staggerChildren: 0.1
          }
    },
    hidden: {
      marginBottom: 0
    }
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29
    },
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      height: 0
    }
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map(menuItem => {
          if (menuItem._id.secondCategory === secondCategory) {
            setAnnounce(menuItem ? 'closed' : 'opened');
            menuItem.isOpened = !menuItem.isOpened;
          }
          return menuItem;
        })
      );
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstLeveList}>
        {firstLevelMenu.map(menuItem => (
          <li
            key={menuItem.route}
            area-expanded={menuItem.id === firstCategory}
          >
            <Link href={`/${menuItem.route}`}>
              <a>
                <div
                  className={cn(styles.firstLevel, {
                    [styles.firstLevelActive]: menuItem.id === firstCategory
                  })}
                >
                  {menuItem.icon}
                  <span>{menuItem.name}</span>
                </div>
              </a>
            </Link>
            {menuItem.id === firstCategory && buildSecondLevel(menuItem)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (menuItemSecond: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map(menuItem => {
          if (
            menuItem.pages
              .map(page => page.alias)
              .includes(router.asPath.split('/')[2])
          )
            menuItem.isOpened = true;
          return (
            <li key={menuItem._id.secondCategory}>
              <button
                className={styles.secondLevel}
                onClick={() => openSecondLevel(menuItem._id.secondCategory)}
                onKeyDown={(key: KeyboardEvent) =>
                  openSecondLevelKey(key, menuItem._id.secondCategory)
                }
                area-expanded={menuItem.isOpened}
              >
                {menuItem._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={menuItem.isOpened ? 'visible' : 'hidden'}
                animate={menuItem.isOpened ? 'visible' : 'hidden'}
                className={cn(styles.secondLevelBlock)}
              >
                {buildThirdLevel(
                  menuItem.pages,
                  menuItemSecond.route,
                  menuItem.isOpened ?? false
                )}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpend: boolean
  ) => {
    return pages.map(page => (
      <motion.li key={page._id} variants={variantsChildren}>
        <Link href={`/${route}/${page.alias}`}>
          <a
            tabIndex={isOpend ? 0 : -1}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/${route}/${page.alias}` === router.asPath
            })}
            area-current={`/${route}/${page.alias}` === router.asPath && 'page'}
          >
            {page.category}
          </a>
        </Link>
      </motion.li>
    ));
  };

  return (
    <nav className={styles.menu} role="navigation">
      {announce && (
        <span role="log" className="visualyHidden">
          {announce === 'opened' ? 'развёрнуто' : 'свёрнуто'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
};
