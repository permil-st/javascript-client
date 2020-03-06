import styled, { css } from 'styled-components';

const PRIMARY_COLOR = 'default';

const ButtonStyle = styled.button`

  padding: 12px;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  background-color: lightgray;

 ${(props) => props.color === PRIMARY_COLOR && css`
  background-color: green;
  color: white;
 `}

:disabled {
  border: 1px solid gray;
  background-color: lightgray;
  color: gray;
}`;

export default ButtonStyle;
