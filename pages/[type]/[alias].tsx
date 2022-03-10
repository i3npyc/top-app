import React from 'react';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import {
  TopLevelCategory,
  TopPageModel
} from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { MenuItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';

import { withLayout } from '../../layout/Layout';
import { TopPageComponent } from '../../page-components';

const TopPage = ({
  firstCategory,
  page,
  products
}: TopPageProps): JSX.Element => {
  return (
    <TopPageComponent
      firstCategory={firstCategory}
      page={page}
      products={products}
    />
  );
};

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const menuItem of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
      {
        firstCategory: menuItem.id
      }
    );
    paths = paths.concat(
      menu.flatMap(m => m.pages.map(page => `/${menuItem.route}/${page.alias}`))
    );
  }
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }
  const firstCategoryItem = firstLevelMenu.find(
    menuItem => menuItem.route === params.type
  );
  if (!firstCategoryItem) {
    return {
      notFound: true
    };
  }
  try {
    const { data: menu } = await axios.post<MenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
      {
        firstCategory: firstCategoryItem.id
      }
    );
    if (!menu.length) {
      return {
        notFound: true
      };
    }
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
        firstCategory: firstCategoryItem.id,
        menu,
        page,
        products
      }
    };
  } catch (e) {
    return {
      notFound: true
    };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
