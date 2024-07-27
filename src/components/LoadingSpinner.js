import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner" aria-label="Loading"></div>
    </div>
  );
};

export default LoadingSpinner;