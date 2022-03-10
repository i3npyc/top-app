import React from 'react';
import cn from 'classnames';

import { SortEnum, SortProps } from './Sort.props';
import SortIcon from './sort.svg';
import styles from './Sort.module.css';

export const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: SortProps): JSX.Element => {
  const sortRating = () => {
    setSort(SortEnum.Rating);
  };
  const sortPrice = () => {
    setSort(SortEnum.Price);
  };

  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span
        onClick={sortRating}
        className={cn({
          [styles.active]: sort === SortEnum.Rating
        })}
      >
        <SortIcon className={styles.sortIcon}/>
        По рейтингу
      </span>
      <span
        onClick={sortPrice}
        className={cn({
          [styles.active]: sort === SortEnum.Price
        })}
      >
        <SortIcon className={styles.sortIcon}/>
        По цене
      </span>
    </div>
  );
};
