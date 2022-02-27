import React, { useEffect, useState, KeyboardEvent } from 'react';
import cn from 'classnames';

import { RatingProps } from './RatingProps';
import styles from './Rating.module.css';
import StarIcon from './Star.svg';

export const Rating = ({
  isEditable = false,
  rating,
  setRating,
  ...props
}: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  );

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updataRating = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span
          key={i}
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => changeRating(i + 1)}
        >
          <StarIcon
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGAElement>) =>
              isEditable && handleSpace(i + 1, e)
            }
          />
        </span>
      );
    });
    setRatingArray(updataRating);
  };
  const changeDisplay = (index: number) => {
    if (!isEditable) return;
    constructRating(index);
  };

  const changeRating = (index: number) => {
    if (!isEditable || !setRating) return;
    setRating(index);
  };

  const handleSpace = (index: number, e: KeyboardEvent<SVGAElement>) => {
    if (e.code !== 'Space' || !setRating) return;
    setRating(index);
  };

  return (
    <div {...props}>
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  );
};
