import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import arrow from './arrow.svg';
import close from './close.svg';
import burger from './burger.svg';

export const icons = {
  arrow,
  close,
  burger
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconName;
  appearance: 'primary' | 'white';
}
