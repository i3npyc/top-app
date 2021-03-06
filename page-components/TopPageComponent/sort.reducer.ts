import { SortEnum } from '../../components/Sort/Sort.props';
import { ProductModel } from '../../interfaces/product.interface';

export type SortActions =
  | { type: SortEnum.Rating }
  | { type: SortEnum.Price }
  | { type: 'UPDATE'; initialState: ProductModel[] };

export interface InitialStateSort {
  sort: SortEnum;
  products: ProductModel[];
}

export const sortReducer = (
  state: InitialStateSort,
  action: SortActions
): InitialStateSort => {
  switch (action.type) {
    case SortEnum.Rating:
      return {
        sort: SortEnum.Rating,
        products: state.products.sort((a, b) =>
          a.initialRating > b.initialRating ? -1 : 1
        )
      };
    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: state.products.sort((a, b) => (a.price > b.price ? 1 : -1))
      };
    case 'UPDATE':
      return {
        sort: SortEnum.Price,
        products: action.initialState
      };
    default:
      throw new Error('Неверный тип сортировки');
  }
};
