import styled from 'styled-components';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import Container from 'components/common/Container';
import mixin from 'style/mixin';
import { colors } from 'style/constants';

type TControllerSize = 'S' | 'L';
interface IQuantityController {
  quantity: number;
  setQuantity: (newQuantity: number) => void;
  min?: number;
  max?: number;
  size: TControllerSize;
}

export default function QuantityController({
  quantity,
  setQuantity,
  min = 1,
  max = 9,
  size,
}: IQuantityController) {
  const handleDecreaseButton = () => {
    setQuantity(quantity - 1);
  };

  const handleIncreaseButton = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    } else {
      alert('많은 주문은 카운터에 문의해주세요. 감사합니다.');
    }
  };

  return (
    <Container flexInfo={{ align: 'center' }} gap={1}>
      <CircleButton
        size={size}
        disabled={quantity === min}
        onClick={handleDecreaseButton}
      >
        <RemoveSharpIcon />
      </CircleButton>
      <QuantityNumber size={size}>{quantity}</QuantityNumber>
      <CircleButton size={size} onClick={handleIncreaseButton}>
        <AddSharpIcon />
      </CircleButton>
    </Container>
  );
}

QuantityController.defaultProps = {
  min: 1,
  max: 99,
};

const CircleButton = styled.button<{ size: TControllerSize }>`
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  border-radius: 100%;
  border: 2px solid ${colors.placeholder};
  color: ${colors.placeholder};
  width: ${({ size }) => (size === 'S' ? '1.75rem' : '2.5rem')};
  height: ${({ size }) => (size === 'S' ? '1.75rem' : '2.5rem')};
`;

const QuantityNumber = styled.span<{ size: TControllerSize }>`
  font-size: ${({ size }) => (size === 'S' ? '1.25rem' : '2rem')};
  font-weight: 600;
`;
