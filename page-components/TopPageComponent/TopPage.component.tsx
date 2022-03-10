import React, { useReducer } from 'react';

import { TopPageComponentProps } from './TopPage.props';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { sortReducer } from './sort.reducer';

import { Advantages, HhData, Htag, P, Sort, Tag } from '../../components';
import styles from './TopPage.module.css';

export const TopPageComponent = ({
  page,
  firstCategory,
  products
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispathSort] = useReducer(
    sortReducer,
    {
      products,
      sort: SortEnum.Rating
    }
  );

  const setSort = (sort: SortEnum) => {
    dispathSort({ type: sort });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page?.title}</Htag>
        <Tag color="grey" size="medium">
          {products?.length}
        </Tag>
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div>
        {sortedProducts?.map(product => (
          <div key={product._id}>{product.title}</div>
        ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page?.category}</Htag>
        <Tag color="red" size="medium">
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags?.map(tagText => (
        <Tag key={tagText} color="primary">
          {tagText}
        </Tag>
      ))}
    </div>
  );
};
