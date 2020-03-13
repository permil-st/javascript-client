import styled from 'styled-components';

const SliderImg = styled.img`
{
  margin: auto;
  display: block;
  height: 100%
}`;

const SliderWrapper = styled.div`
{
  width: 100%;
  height: ${(props) => ((props.height) ? props.height : '200px')};
}
`;

export { SliderImg, SliderWrapper };
