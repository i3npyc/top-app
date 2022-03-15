import React, { ForwardedRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { ReviewListProps } from './ReviewList.props';

import { Card, Review, Divider, ReviewForm } from '..';
import styles from './ReviewList.module.css';

export const ReviewList = forwardRef(
  (
    { isReview, reviews, productId }: ReviewListProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const variants = {
      visible: { opacity: 1, height: 'auto' },
      hidden: { opacity: 0, height: 0 }
    };
    return (
      <motion.div
        animate={isReview ? 'visible' : 'hidden'}
        variants={variants}
        initial="hidden"
      >
        <Card color="blue" className={cn(styles.review)} ref={ref}>
          {reviews.map(review => (
            <div key={review._id}>
              <Review review={review} />
              <Divider />
            </div>
          ))}
          <ReviewForm productId={productId} />
        </Card>
      </motion.div>
    );
  }
);

ReviewList.displayName = 'ReviewList';
