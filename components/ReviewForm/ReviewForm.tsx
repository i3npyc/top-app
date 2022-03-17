import React, { useState } from 'react';
import cn from 'classnames';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { ReviewFormProps } from './ReviewForm.props';
import { IReviewForm, IReviewSentResponse } from './Review.intergace';
import { API } from '../../helpers/api';
import { Input, Rating, Textarea, Button } from '..';

import CloseIcon from './close.svg';
import styles from './ReviewForm.module.css';

export const ReviewForm = ({
  productId,
  isReview,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        setIsError(undefined);
        reset();
      } else {
        setIsSuccess(false);
        setIsError('Что-то пошло не так');
      }
    } catch (e) {
      setIsSuccess(false);
      setIsError('Что-то пошло не так');
    }
  };

  const closeSuccess = () => {
    setIsSuccess(false);
  };

  const closeError = () => {
    setIsError(undefined);
  };

  const cleanErrors = () => {
    clearErrors();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.form, className)} {...props}>
        <Input
          {...register('name', {
            required: { value: true, message: 'Заполните имя' }
          })}
          placeholder="Имя"
          error={errors.name}
          tabIndex={isReview ? 0 : -1}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Заполните заголовок' }
          })}
          placeholder="Заголовок отзыва"
          error={errors.title}
          className={styles.titleInput}
          tabIndex={isReview ? 0 : -1}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: { value: true, message: 'Укажите рейтинг' }
            }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isReview ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: { value: true, message: 'Заполните текст отзыва' }
          })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
          tabIndex={isReview ? 0 : -1}
          aria-label="Текст отзыва"
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button
            appearance="primary"
            tabIndex={isReview ? 0 : -1}
            className={styles.btn}
            onClick={cleanErrors}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.panel, styles.success)} role="alert">
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <button
            onClick={closeSuccess}
            className={styles.close}
            area-label="Закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {isError && (
        <div className={cn(styles.panel, styles.error)} role="alert">
          <div>{isError}</div>
          <button
            className={styles.close}
            onClick={closeError}
            area-label="Закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
