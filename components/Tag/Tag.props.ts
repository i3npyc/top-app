import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  size?: 'small' | 'medium';
  color?: 'ghost' | 'primary' | 'red' | 'grey' | 'green';
  href?: string;
}
