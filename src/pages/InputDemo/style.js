import styled, { css } from 'styled-components';

const Label = styled.h4`
{
  font-weight: bold;
  font-size: 14px;
}
`;

const Item = styled.div`
{
  padding: 16px 0px;
  ${(props) => props.align && css`
    display:flex;
    justify-content: end;
 `}
`;

const Form = styled.form`
{
  margin: 16px;
}
`;

export { Label, Item, Form };
