import React from 'react';
import PropTypes from 'prop-types';
import { Label, Item } from './style';

const Field = (props) => {
  const { label, children } = props;
  return (
    <Item>
      <Label>{label}</Label>
      {children}
    </Item>
  );
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};


export default Field;
