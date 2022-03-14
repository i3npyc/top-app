import React, { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import { ReviewListProps } from './ReviewList.props';

import { Card, Review, Divider, ReviewForm } from '..';
import styles from './ReviewList.module.css';

export const ReviewList = forwardRef(
  (
    { isReview, reviews, productId }: ReviewListProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    return (
      <Card
        color="blue"
        className={cn(styles.reviews, {
          [styles.opened]: isReview,
          [styles.closed]: !isReview
        })}
        ref={ref}
      >
        {reviews.map(review => (
          <div key={review._id}>
            <Review review={review} />
            <Divider />
          </div>
        ))}
        <ReviewForm productId={productId} />
      </Card>
    );
  }
);

ReviewList.displayName = 'ReviewList';
