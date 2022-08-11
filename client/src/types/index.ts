export type CategoryIdType = number;
export interface ICategory {
  id: CategoryIdType;
  name: string;
}

export type MenuIdType = number;
export interface IMenu {
  id: MenuIdType;
  name: string;
  basePrice: number;
  imgUrl: string;
  isSoldOut: boolean;
}

export interface IMenuSales {
  id: MenuIdType;
  name: string;
  totalSoldQuantity: number;
}

export interface IPaymentMethod {
  id: number;
  name: string;
}

export type ChoiceIdType = number;
export interface IChoice {
  id: ChoiceIdType;
  name: string;
  extraCharge: number;
}

export interface IChoiceGroup {
  id: number;
  name: string;
  isOptional: boolean;
  choices: IChoice[];
}

export interface ICartItem extends Omit<IMenu, 'isSoldOut' | 'basePrice'> {
  quantity: number;
  price: number;
  choices: IChoice[];
}

export type PageType = 'ENTRANCE' | 'MAIN';

export interface IMenusGroupByCategory extends ICategory {
  menus: IMenu[];
}

type TServerSavedSoldMenu = {
  menuName: string;
  quantity: number;
  sales: number;
  choiceSummary: string;
};

export type GetMenuCategoriesApiResponseDto = ICategory[];
export type GetMenusApiResponseDto = IMenusGroupByCategory[];
export type GetPaymentMethodsApiResponseDto = IPaymentMethod[];
export type GetChoicesApiResponseDto = IChoiceGroup[];
export type GetSalesStatApiResponseDto = IMenuSales[];
export type PostOrderApiResponseDto = {
  status: 'ok' | 'fail';
  data: {
    todayOrderNum: number;
    soldMenus: TServerSavedSoldMenu[];
  };
};
