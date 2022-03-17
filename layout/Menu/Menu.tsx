import React, { KeyboardEvent, useContext } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { AppContext } from '../../context/app.context';
import { firstLevelMenu } from '../../helpers/helpers';

import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';

import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
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
      opacity: 0,
      height: 0
    }
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map(menuItem => {
          if (menuItem._id.secondCategory === secondCategory) {
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
      <>
        {firstLevelMenu.map(menuItem => (
          <div key={menuItem.route}>
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
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItemSecond: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map(menuItem => {
          if (
            menuItem.pages
              .map(page => page.alias)
              .includes(router.asPath.split('/')[2])
          )
            menuItem.isOpened = true;
          return (
            <div key={menuItem._id.secondCategory}>
              <div
                tabIndex={0}
                className={styles.secondLevel}
                onClick={() => openSecondLevel(menuItem._id.secondCategory)}
                onKeyDown={(key: KeyboardEvent) =>
                  openSecondLevelKey(key, menuItem._id.secondCategory)
                }
              >
                {menuItem._id.secondCategory}
              </div>
              <motion.div
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
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpend: boolean
  ) => {
    return pages.map(page => (
      <motion.div key={page._id} variants={variantsChildren}>
        <Link href={`/${route}/${page.alias}`}>
          <a
            tabIndex={isOpend ? 0 : -1}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/${route}/${page.alias}` === router.asPath
            })}
          >
            {page.category}
          </a>
        </Link>
      </motion.div>
    ));
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
