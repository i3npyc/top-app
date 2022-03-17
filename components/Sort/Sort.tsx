import React, { KeyboardEvent } from 'react';
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

  const onKeyClick = (e: KeyboardEvent<HTMLSpanElement>, index: string) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      if (index === 'rating') return sortRating();
      if (index === 'price') return sortPrice();
    }
  };

  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span
        onClick={sortRating}
        tabIndex={0}
        className={cn({
          [styles.active]: sort === SortEnum.Rating
        })}
        onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) =>
          onKeyClick(e, 'rating')
        }
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </span>
      <span
        onClick={sortPrice}
        tabIndex={0}
        className={cn({
          [styles.active]: sort === SortEnum.Price
        })}
        onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) =>
          onKeyClick(e, 'price')
        }
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </span>
    </div>
  );
};
