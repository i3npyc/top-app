import React from 'react';

import { PProps } from './P.props';
import styles from './P.module.css';

export const P = ({ children, size, ...props }: PProps): JSX.Element => {
  switch (size) {
    case 'small':
      return (
        <p className={styles.small} {...props}>
          {children}
        </p>
      );
    case 'medium':
      return (
        <p className={styles.medium} {...props}>
          {children}
        </p>
      );
    case 'big':
      return (
        <p className={styles.big} {...props}>
          {children}
        </p>
      );
  }
};
