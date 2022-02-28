import React from 'react';

import { FooterProps } from './FooterProps';
import styles from './Footer.module.css';

export const Footer = ({ ...props }: FooterProps) => {
  return <div {...props}>Footer</div>;
};
