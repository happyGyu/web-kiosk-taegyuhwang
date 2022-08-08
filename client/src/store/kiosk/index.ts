import {
  GetMenuCategoriesApiResponseDto,
  GetMenusApiResponseDto,
  GetPaymentMethodsApiResponseDto,
} from '../../types/index';

interface IInitProps {
  categories: GetMenuCategoriesApiResponseDto;
  menusGroupByCategory: GetMenusApiResponseDto;
  paymentMethods: GetPaymentMethodsApiResponseDto;
}

const kioskStore = (() => {
  const data: IInitProps = {
    categories: [],
    menusGroupByCategory: [],
    paymentMethods: [],
  };

  function init({
    categories,
    menusGroupByCategory,
    paymentMethods,
  }: IInitProps) {
    data.categories = categories;
    data.menusGroupByCategory = menusGroupByCategory;
    data.paymentMethods = paymentMethods;
  }

  return { init, data };
})();

export default kioskStore;
