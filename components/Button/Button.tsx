import React from "react";
import cn from 'classnames'

import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";

export const Htag = ({ appearance, children }: ButtonProps): JSX.Element => {
  return <button className={styles.button}>{children}</button>;
};
