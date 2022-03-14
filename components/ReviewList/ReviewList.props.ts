import { DetailedHTMLProps, HTMLAttributes, RefObject } from 'react';
import { ReviewModel } from '../../interfaces/product.interface';

export interface ReviewListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isReview: boolean;
  reviews: ReviewModel[];
  productId: string;
}
