import styled, { css } from 'styled-components';

const Label = styled.h4`
{
  font-weight: bold;
  font-size: 14px;
}
`;

const Item = styled.div`
{
  padding-bottom: 16px;
  ${(props) => props.align && css`
    display:flex;
    justify-content: end;
 `}
`;

export { Label, Item };
