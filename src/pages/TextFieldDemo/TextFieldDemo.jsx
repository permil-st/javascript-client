import React from 'react';
import { TextField } from '../../components';
import { Label, Wrapper, Item } from './style';

const TextFieldDemo = () => (
  <Wrapper>
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
