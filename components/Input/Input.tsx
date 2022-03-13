import React, { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { InputProps } from './Input.props';
import styles from './Input.module.css';

export const Input = forwardRef(
  (
    { className, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <input className={cn(className, styles.input)} ref={ref} {...props} />
    );
  }
);

Input.displayName = 'Input';