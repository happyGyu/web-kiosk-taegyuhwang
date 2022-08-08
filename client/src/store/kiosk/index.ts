import {
  GetMenuCategoriesApiResponseDto,
  GetMenusApiResponseDto,
  GetPaymentMethodsApiResponseDto,
} from '../../types/index';

interface IInitProps {
  categories: GetMenuCategoriesApiResponseDto;
  menus: GetMenusApiResponseDto;
  paymentMethods: GetPaymentMethodsApiResponseDto;
}

const kioskStore = (() => {
  const data: IInitProps = {
    categories: [],
    menus: [],
    paymentMethods: [],
  };

  function init({ categories, menus, paymentMethods }: IInitProps) {
    data.categories = categories;
    data.menus = menus;
    data.paymentMethods = paymentMethods;
  }

  return { init, data };
})();

export default kioskStore;
