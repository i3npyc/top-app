import React, { useContext } from 'react';
import cn from 'classnames';
import { AppContext } from '../../context/app.context';

import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { TopLevelCategory } from '../../interfaces/page.interface';

import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';

import styles from './Menu.module.css';

const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    id: TopLevelCategory.Courses,
    name: 'Курсы',
    route: 'courses',
    icon: <CoursesIcon />
  },
  {
    id: TopLevelCategory.Services,
    name: 'Сервисы',
    route: 'services',
    icon: <ServicesIcon />
  },
  {
    id: TopLevelCategory.Books,
    name: 'Книги',
    route: 'books',
    icon: <BooksIcon />
  },
  {
    id: TopLevelCategory.Products,
    name: 'Товары',
    route: 'products',
    icon: <ProductsIcon />
  }
];

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map(menuItem => (
          <div key={menuItem.route}>
            <a href={`/${menuItem.route}`}>
              <div
                className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: menuItem.id === firstCategory
                })}
              >
                {menuItem.icon}
                <span>{menuItem.name}</span>
              </div>
            </a>
            {menuItem.id === firstCategory && buildSecondLevel(menuItem)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItemSecond: FirstLevelMenuItem) => {
    return (
      <div>
        {menu.map(menuItem => (
          <div key={menuItem._id.secondCategory}>
            <div className={styles.secondLevel}>
              {menuItem._id.secondCategory}
            </div>
            <div
              className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlock]: menuItem.isOpened
              })}
            >
              {buildThirdLevel(menuItem.pages, menuItemSecond.route)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return pages.map(page => (
      <a
        key={page.alias}
        href={`${route}/${page.alias}`}
        className={cn(styles.thirdLevel, {
          [styles.thirdLevelActive]: true
        })}
      >
        {page.category}
      </a>
    ));
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
