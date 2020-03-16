import styled from 'styled-components';

const RadioGroupStyle = styled.input`
{
  font-size: 12px;
}

:disabled {
  border: 1px solid lightgray;
}

  &.error {
  border: 1px solid red;
}`;

export default RadioGroupStyle;
