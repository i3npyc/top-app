import React, {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
  useRef
} from 'react';
import cn from 'classnames';

import { RatingProps } from './RatingProps';
import styles from './Rating.module.css';
import StarIcon from './Star.svg';

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      rating,
      setRating,
      error,
      tabIndex,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    const computedFocus = (current: number, index: number): number => {
      if (!isEditable) return -1;
      if (!rating && index === 0) return tabIndex ?? 0;
      if (current === index + 1) return tabIndex ?? 0;
      return -1;
    };

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
            tabIndex={computedFocus(rating, i)}
            onKeyDown={handleKey}
            ref={r => ratingArrayRef.current?.push(r)}
            role={isEditable ? 'slider' : ''}
            aria-invalid={error ? true : false}
            area-valuenow={rating}
            area-valuemax={5}
            area-valuemin={1}
            area-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + rating}
          >
            <StarIcon />
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

    const handleKey = (e: KeyboardEvent<HTMLSpanElement>) => {
      if (!isEditable || !setRating) {
        return;
      }
      if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }
      if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.ratingWrapper, {
          [styles.error]: error
        })}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';
