import React from 'react';
import './input-with-label.scss';

const InputWithLabel = ({ label, ...rest }) => {
  return (
    <div className="input-with-label">
      <label>{label}</label>
      <input {...rest} />
    </div>
  );
};

export default InputWithLabel;
