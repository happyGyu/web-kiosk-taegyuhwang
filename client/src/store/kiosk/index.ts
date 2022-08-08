import {
  GetMenuCategoriesApiResponseDto,
  GetMenusApiResponseDto,
  GetPaymentMethodsApiResponseDto,
} from '../../types/index';

interface IInitProps {
  categories?: GetMenuCategoriesApiResponseDto;
  menus?: GetMenusApiResponseDto;
  paymentMethods?: GetPaymentMethodsApiResponseDto;
}

const kioskStore = (() => {
  const data: IInitProps = {
    categories: undefined,
    menus: undefined,
    paymentMethods: undefined,
  };

  function init({ categories, menus, paymentMethods }: IInitProps) {
    data.categories = categories;
    data.menus = menus;
    data.paymentMethods = paymentMethods;
  }

  function get(target: keyof IInitProps) {
    return data[target];
  }

  return { init, get };
})();

export default kioskStore;
