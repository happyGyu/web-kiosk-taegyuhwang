export interface IMenuCategory {
  id: number;
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

export interface IMenuWithCategory extends IMenuCategory {
  menus: IMenu[];
}

export type GetMenuCategoriesApiResponseDto = IMenuCategory[];
export type GetMenusApiResponseDto = IMenuWithCategory[];
export type GetPaymentMethodsApiResponseDto = IPaymentMethod[];
