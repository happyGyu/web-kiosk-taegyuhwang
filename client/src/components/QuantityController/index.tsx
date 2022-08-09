import styled from 'styled-components';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import Container from 'components/common/Container';
import mixin from 'style/mixin';
import { colors } from 'style/constants';

interface IQuantityController {
  quantity: number;
  setQuantity: (newQuantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityController({
  quantity,
  setQuantity,
  min = 1,
  max = 99,
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
    <Container>
      <CircleButton disabled={quantity === min} onClick={handleDecreaseButton}>
        <RemoveSharpIcon />
      </CircleButton>
      <span>quantity</span>
      <CircleButton onClick={handleIncreaseButton}>
        <AddSharpIcon />
      </CircleButton>
    </Container>
  );
}

QuantityController.defaultProps = {
  min: 1,
  max: 99,
};

const CircleButton = styled.button`
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  border-radius: 100%;
  border: 2px solid ${colors.placeholder};
  color: ${colors.placeholder};
  width: '1.75rem';
  height: '1.75rem';
`;
