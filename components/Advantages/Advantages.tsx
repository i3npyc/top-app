import React from 'react';
import { AdvantagesProps } from './Advantages.props';

import CheckIcon from './check.svg';
import styles from './Advantages.module.css';

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <>
      {advantages?.map(advantage => (
        <div key={advantage._id} className={styles.advantage}>
          <CheckIcon />
          <div className={styles.title}>{advantage.title}</div>
          <span className={styles.line} />
          <div>{advantage.description}</div>
        </div>
      ))}
    </>
  );
};
