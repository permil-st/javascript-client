import styled, { css } from 'styled-components';

const Form = styled.form`
{
  margin: 16px;
  width: 400px;
}
`;

const Item = styled.div`
{
  ${(props) => props.align && css`
    display:flex;
    justify-content: end;
 `}
`;

export { Form, Item };
