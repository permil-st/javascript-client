import React from 'react';
import { TextField } from '../../components';

const style = { 'font-weight': 'bold' };

const TextFieldDemo = () => (
  <div style={{ margin: '16px' }}>
    <div style={{ padding: '16px 0px' }}>
      <h4 style={style}>This is Disabled Input</h4>
      <TextField value="Disabled Input" disabled />
    </div>
    <div style={{ padding: '16px 0px' }}>
      <h4 style={style}>A Valid Input</h4>
      <TextField value="Accessible" />
    </div>
    <div style={{ padding: '16px 0px' }}>
      <h4 style={style}>An Input with errors</h4>
      <TextField value="101" error="Could not be greater than 100" />
    </div>
  </div>
);

export default TextFieldDemo;
