import React from 'react';

import { TextField, Slider } from '../../components';
import { Label, Wrapper, Item } from './style';

const bannerImages = ['cloud.jpg', 'dns-server.png', 'full-stack-web-development.jpg', 'js.jpg', 'load-balancer.png'];

const TextFieldDemo = () => (
  <Wrapper>
    <Slider altText="Default Banner" banners={bannerImages} duration={2000} height={250} />
    <Item>
      <Label>This is Disabled Input</Label>
      <TextField value="Disabled Input" disabled />
    </Item>
    <Item>
      <Label>A Valid Input</Label>
      <TextField value="Accessible" />
    </Item>
    <Item>
      <Label>An Input with errors</Label>
      <TextField value="101" error="Could not be greater than 100" />
    </Item>
  </Wrapper>
);

export default TextFieldDemo;
