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