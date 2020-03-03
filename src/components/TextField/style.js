import styled from 'styled-components';

const TextField = styled.input`
{
  width: 500px;
  padding: 10px;
  margin: 16px 16px 16px 0px;
  border: 1px solid orange;
  border-radius: 6px;
  font-size: 12px;
}

:disabled {
  border: 1px solid lightgray;
}

  &.error {
  border: 1px solid red;
}`;

export default TextField;
