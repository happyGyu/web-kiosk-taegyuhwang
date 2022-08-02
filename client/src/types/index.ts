export interface IMenuCategory {
  categoryId: number;
  categoryName: string;
}

export interface IMenu {
  id: number;
  name: string;
  basePrice: number;
  imgUrl: string;
  isSoldOut: boolean;
}
