export type CategoryIdType = number;
export interface ICategory {
  id: CategoryIdType;
  name: string;
}

export interface IMenu {
  id: number;
  name: string;
  basePrice: number;
  imgUrl: string;
  isSoldOut: boolean;
}

export interface IPaymentMethod {
  id: number;
  name: string;
}

export type PageType = 'ENTRANCE' | 'MAIN';

export interface IMenuWithCategory extends ICategory {
  menus: IMenu[];
}

export type GetMenuCategoriesApiResponseDto = ICategory[];
export type GetMenusApiResponseDto = IMenuWithCategory[];
export type GetPaymentMethodsApiResponseDto = IPaymentMethod[];
