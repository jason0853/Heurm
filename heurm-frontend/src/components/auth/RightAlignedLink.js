import React from 'react';
import { Link } from 'react-router-dom';
import './right-aligned-link.scss';

const RightAlignedLink = ({ to, children }) => {
  return (
    <div className="right-aligned-link">
      <Link to={to}>{children}</Link>
    </div>
  );
};

export default RightAlignedLink;
