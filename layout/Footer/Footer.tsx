import React from 'react';

import { FooterProps } from './FooterProps';
import styles from './Footer.module.css';

export const Footer = ({ ...props }: FooterProps) => {
  return (
    <div {...props}>
      <div className={styles.copyright}>
        OwlTop © 2020 - 2022 Все права защищены
      </div>
      <div className={styles.agreement}>Пользовательское соглашение</div>
      <div className={styles.politics}>Политика конфиденциальности</div>
    </div>
  );
};
