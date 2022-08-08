import CustomModal from 'components/Modal';
import { MenuIdType } from 'types';

interface IMenuChoiceModal {
  selectedMenuId: MenuIdType;
  cancelMenuSelection: () => void;
}

export default function MenuChoiceModal({
  selectedMenuId,
  cancelMenuSelection,
}: IMenuChoiceModal) {
  return (
    <CustomModal closeModal={cancelMenuSelection}>
      <div>{selectedMenuId}</div>
    </CustomModal>
  );
}
