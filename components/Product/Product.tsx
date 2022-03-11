import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import { ProductProps } from './Product.props';
import { devlOfNum, priceRu } from '../../helpers/helpers';

import { Button, Card, Divider, Rating, Tag } from '..';
import styles from './Product.module.css';

export const Product = ({ product }: ProductProps): JSX.Element => {
  return (
    <Card className={styles.product}>
      <div className={styles.logo}>
        <Image
          src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
          alt={product.title}
          width={70}
          height={70}
        />
      </div>
      <div className={styles.title}>{product.title}</div>
      <div className={styles.price}>
        {priceRu(product.price)}
        {product.oldPrice && (
          <Tag className={styles.sale} color="green">
            {priceRu(product.price - product.oldPrice)}
          </Tag>
        )}
      </div>
      <div className={styles.credit}>
        {priceRu(product.credit)}/<span>мес</span>
      </div>
      <div className={styles.rating}>
        <Rating rating={product.reviewAvg ?? product.initialRating} />
      </div>
      <div className={styles.tags}>
        {product.categories.map(category => (
          <Tag key={category} color="ghost" className={styles.category}>
            {category}
          </Tag>
        ))}
      </div>
      <div className={styles.priceTitle}>цена</div>
      <div className={styles.creditTitle}>кредит</div>
      <div className={styles.rateTitle}>
        {product.reviewCount}{' '}
        {devlOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
      </div>
      <Divider className={styles.hr} />
      <div className={styles.description}>{product.description}</div>
      <div className={styles.feature}>
        {product.characteristics.map(characteristic => (
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
        {product.advantages && (
          <div
            className={cn(styles.advantages, {
              [styles.only]: !product.disadvantages
            })}
          >
            <div className={styles.comparisonsTitle}>Преимущества</div>
            <div>{product.advantages}</div>
          </div>
        )}
        {product.disadvantages && (
          <div className={styles.disadvantages}>
            <div className={styles.comparisonsTitle}>Недостатки</div>
            <div>{product.disadvantages}</div>
          </div>
        )}
      </div>
      <Divider className={cn(styles.hr, styles.hr2)} />
      <div className={styles.actions}>
        <Button appearance="primary">Узнать подробнее</Button>
        <Button appearance="ghost" arrow="right">
          Читать отзывы
        </Button>
      </div>
    </Card>
  );
};
