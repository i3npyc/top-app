import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';

import { MenuItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { API } from '../../helpers/api';

import { withLayout } from '../../layout/Layout';

const Type = ({ firstCategory }: TypeProps): JSX.Element => {
  return <div>Type: {firstCategory}</div>;
};

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(menuItem => '/' + menuItem.route),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
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
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id
  });
  return {
    props: {
      firstCategory: firstCategoryItem.id,
      menu
    }
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
