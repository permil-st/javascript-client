import React from 'react';
import PropTypes from 'prop-types';
import TextFieldStyle from './style';

// <input type="text" className="TextField" value={value} disabled={(disabled)} />
const TextField = ({ value = '', disabled = false, error }) => (
  <div>
    <TextFieldStyle type="text" className={(error) ? 'error' : ''} value={value} disabled={(disabled)} />
    <p style={{ color: 'red' }}>{error}</p>
  </div>
);

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

// class TextField extends React.Component {

//   constructor(props) {
//     super(props);
//   }

//   render() {

//     const { value='', disabled = false, error } = this.props;

//     return (
//       <input type="text" value={value} disabled = { (disabled) }/>
//     )
//   }

// }

export default TextField;
