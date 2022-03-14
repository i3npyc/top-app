import React, { useRef, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import { ProductProps } from './Product.props';
import { devlOfNum, priceRu } from '../../helpers/helpers';

import { Button, Card, Divider, Rating, Tag, ReviewList } from '..';
import styles from './Product.module.css';

export const Product = ({
  product,
  className,
  ...props
}: ProductProps): JSX.Element => {
  const {
    _id,
    image,
    title,
    price,
    oldPrice,
    credit,
    reviewAvg,
    initialRating,
    categories,
    reviewCount,
    description,
    characteristics,
    advantages,
    disadvantages,
    reviews
  } = product;

  const [isReview, setIsReview] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const toggleReview = () => {
    setIsReview(!isReview);
  };

  const scrollToReview = () => {
    setIsReview(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className={className} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={process.env.NEXT_PUBLIC_DOMAIN + image}
            alt={title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.price}>
          {priceRu(price)}
          {oldPrice && (
            <Tag className={styles.sale} color="green">
              {priceRu(price - oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          {priceRu(credit)}/<span>мес</span>
        </div>
        <div className={styles.rating}>
          <Rating rating={reviewAvg ?? initialRating} />
        </div>
        <div className={styles.tags}>
          {categories.map(category => (
            <Tag key={category} color="ghost" className={styles.category}>
              {category}
            </Tag>
          ))}
        </div>
        <div className={styles.priceTitle}>цена</div>
        <div className={styles.creditTitle}>кредит</div>
        <div className={styles.rateTitle}>
          <a href="#ref" onClick={scrollToReview}>
            {reviewCount}{' '}
            {devlOfNum(reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </a>
        </div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{description}</div>
        <div className={styles.feature}>
          {characteristics.map(characteristic => (
            <div key={characteristic.name} className={styles.characteristic}>
              <span className={styles.characteristicName}>
                {characteristic.name}
              </span>
              <span className={styles.characteristicDots}></span>
              <span className={styles.characteristicValue}>
                {characteristic.value}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.comparisons}>
          {advantages && (
            <div
              className={cn(styles.advantages, {
                [styles.only]: !disadvantages
              })}
            >
              <div className={styles.comparisonsTitle}>Преимущества</div>
              <div>{advantages}</div>
            </div>
          )}
          {disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.comparisonsTitle}>Недостатки</div>
              <div>{disadvantages}</div>
            </div>
          )}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance="primary">Узнать подробнее</Button>
          <Button
            onClick={toggleReview}
            appearance="ghost"
            arrow={isReview ? 'down' : 'right'}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <ReviewList
        ref={reviewRef}
        isReview={isReview}
        reviews={reviews}
        productId={_id}
      />
    </div>
  );
};
