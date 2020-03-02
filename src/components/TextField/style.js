import styled from 'styled-components';

const TextField = styled.input`
{
  width: 500px;
  padding: 8px;
  margin: 16px 16px 16px 0px;
  border: 1px solid black;
  border-radius: 6px;
}

  &.error {
  border: 1px solid red;  
}`;

export default TextField;
