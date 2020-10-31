'use strict';

const { createElement, useState } = React;

const LikeButton2 = () => {
  const [liked, setLiked] = useState(false);
  return liked ? (
    'You liked this.'
  ) : (
    <button onClick={() => setLiked(true)}>Like</button>
  );
};

window.addEventListener('load', () => {
  const domContainer = document.querySelector('#table-of-content');
  ReactDOM.render(createElement(LikeButton2), domContainer);
});
