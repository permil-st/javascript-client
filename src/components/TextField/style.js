import styled from 'styled-components';

const TextField = styled.input`
{
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 12px;
  border: 1px solid lightgray;
  border-radius: 5px;
}

:disabled {
  border: 1px solid lightgray;
}

  &.error {
  border: 1px solid red;
}`;

export default TextField;
