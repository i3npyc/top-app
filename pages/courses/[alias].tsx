import React from 'react';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import { TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';

import { MenuItem } from '../../interfaces/menu.interface';
import { withLayout } from '../../layout/Layout';

const firstCategory = 0;

const Courses = ({ menu, page, products }: CoursesProps): JSX.Element => {
  return <div>{products.length}</div>;
};

export default withLayout(Courses);

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {
      firstCategory
    }
  );
  return {
    paths: menu.flatMap(menuItem =>
      menuItem.pages.map(page => '/courses/' + page.alias)
    ),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<CoursesProps> = async ({
  params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {
      firstCategory
    }
  );
  const { data: page } = await axios.get<TopPageModel>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias
  );
  const { data: products } = await axios.post<ProductModel[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
    {
      category: page.category,
      limit: 10
    }
  );
  return {
    props: {
      firstCategory,
      menu,
      page,
      products
    }
  };
};

interface CoursesProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
}
