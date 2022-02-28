import React, { useState } from 'react';

import { Htag, Button, P, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';

const Home = (): JSX.Element => {

  const [rating, setRating] = useState<number>(4)
  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button appearance="primary" arrow='right'>Кнопка</Button>
      <Button appearance="ghost" arrow='right'>Кнопка</Button>
      <P size='big'>Текст</P>
      <Tag size='small'>Маленький</Tag>
      <Tag size='medium' color='primary'>Средний</Tag>
      <Tag size='medium' color='red'>Красный</Tag>
      <Tag size='medium' color='green'>Зелёный</Tag>
      <Rating rating={rating} setRating={setRating} isEditable/>
    </>
  );
};

export default withLayout(Home);
