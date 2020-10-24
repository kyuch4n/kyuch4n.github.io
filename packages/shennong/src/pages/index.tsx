import React from 'react';
import Unlock from '@/components/unlock';
import './index.css';

export default () => {
  return (
    <div className="index-page-container">
      <div id="spooky-container">
        <span style={{ visibility: 'hidden' }}>SP</span>
        OO
        <span style={{ visibility: 'hidden' }}>KY</span>
      </div>
      <Unlock></Unlock>
    </div>
  );
};
