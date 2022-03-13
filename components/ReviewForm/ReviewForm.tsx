import React from 'react';
import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';

import { ReviewFormProps } from './ReviewForm.props';
import { IReviewForm } from './Review.intergace';
import { Input, Rating, Textarea, Button } from '..';

import CloseIcon from './close.svg';
import styles from './ReviewForm.module.css';

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit } = useForm<IReviewForm>();

  const onSubmit = (data: IReviewForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.form, className)} {...props}>
        <Input {...register('name')} placeholder="Имя" />
        <Input
          {...register('title')}
          placeholder="Заголовок отзыва"
          className={styles.titleInput}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description')}
          placeholder="Текст отзыва"
          className={styles.description}
        />
        <div className={styles.submit}>
          <Button appearance="primary" className={styles.btn}>
            Отправить
          </Button>
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
    </form>
  );
};
