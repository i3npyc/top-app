import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';

import { MenuItem } from '../interfaces/menu.interface';
import { Htag, Button, P, Tag, Rating, Input, Textarea } from '../components';
import { withLayout } from '../layout/Layout';

const Home = ({ menu }: HomeProps): JSX.Element => {
  const [rating, setRating] = useState<number>(4);
  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button appearance="primary" arrow="right">
        Кнопка
      </Button>
      <Button appearance="ghost" arrow="right">
        Кнопка
      </Button>
      <P size="big">Текст</P>
      <Tag size="small">Маленький</Tag>
      <Tag size="medium" color="primary">
        Средний
      </Tag>
      <Tag size="medium" color="red">
        Красный
      </Tag>
      <Tag size="medium" color="green">
        Зелёный
      </Tag>
      <Rating rating={rating} setRating={setRating} isEditable />
      <Input placeholder="test" />
      <Textarea />
    </>
  );
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {
      firstCategory
    }
  );
  return {
    props: {
      firstCategory,
      menu
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
