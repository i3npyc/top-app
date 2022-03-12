import React from 'react';
import cn from 'classnames';
import { ReviewFormProps } from './ReviewForm.props';

import { Input, Rating, Textarea, Button } from '..';
import CloseIcon from './close.svg';
import styles from './ReviewForm.module.css';

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  return (
    <>
      <div className={cn(styles.form, className)} {...props}>
        <Input placeholder="Имя" />
        <Input placeholder="Заголовок отзыва" className={styles.titleInput} />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Rating rating={0} />
        </div>
        <Textarea placeholder="Текст отзыва" className={styles.description} />
        <div className={styles.submit}>
          <Button appearance="primary" className={styles.btn}>Отправить</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
        <CloseIcon className={styles.close} />
      </div>
    </>
  );
};
