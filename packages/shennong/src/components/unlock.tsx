import React, { useEffect } from 'react';
import useLock from '@/hooks/useLock';
import './unlock.less';

export default () => {
  useLock();

  return (
    <div className="unlock-container">
      <ul className="unlck">
        <li className="drag">
          <i className="fa fa-lock"></i>
        </li>
        <li className="ml">
          <a className="fa fa-user"></a>
        </li>
        <li className="mr">
          <a className="fa fa-envelope"></a>
        </li>
        <li className="tc">
          <a className="fa fa-wifi"></a>
        </li>
        <li className="bc">
          <a className="fa fa-comment"></a>
        </li>
        <li className="tr">
          <a className="fa fa-facebook-square"></a>
        </li>
        <li className="tl">
          <a className="fa fa-github"></a>
        </li>
        <li className="bl">
          <a className="fa fa-phone"></a>
        </li>
        <li className="br">
          <a className="fa fa-video-camera"></a>
        </li>
      </ul>
    </div>
  );
};
