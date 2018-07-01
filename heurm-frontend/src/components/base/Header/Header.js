import React from 'react';
import './header.scss';

const test = true ? 'pink' : '';

const Header = ({ children }) => {
  return <div className={['header', test].join(' ')}>Header</div>;
};

export default Header;
