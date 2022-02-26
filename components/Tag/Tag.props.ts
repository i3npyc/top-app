import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  size?: 'medium' | 'big';
  color: 'ghost' | 'primary' | 'red' | 'grey' | 'green';
  href?: string;
}
