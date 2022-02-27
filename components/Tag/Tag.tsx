import React from 'react';
import cn from 'classnames';

import { TagProps } from './Tag.props';
import styles from './Tag.module.css';

export const Tag = ({
  children,
  color = 'ghost',
  size = 'small',
  className,
  href,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.small]: size === 'small',
        [styles.medium]: size === 'medium',
        [styles.ghost]: color === 'ghost',
        [styles.primary]: color === 'primary',
        [styles.red]: color === 'red',
        [styles.grey]: color === 'grey',
        [styles.green]: color === 'green'
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
