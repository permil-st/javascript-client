import styled from 'styled-components';

const RadioGroupStyle = styled.input`
{
  font-size: 12px;
  margin: 5px 10px 5px 0px;
}

:disabled {
  border: 1px solid lightgray;
}

  &.error {
  border: 1px solid red;
}`;

export default RadioGroupStyle;
