import React from 'react';
import { Link } from 'react-router-dom';
import './right-aligned-link.scss';

const RightAlignedLink = ({ path, children }) => {
  return (
    <div className="right-aligned-link">
      <Link to={path}>{children}</Link>
    </div>
  );
};

export default RightAlignedLink;
