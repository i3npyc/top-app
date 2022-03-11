import { FirstLevelMenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';

import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';

export const firstLevelMenu: FirstLevelMenuItem[] = [
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

export const priceRu = (price: number): string =>
  price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .concat(' ₽');

export const devlOfNum = (
  num: number,
  titles: [string, string, string]
): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
};
