'use strict';

const { createElement, useState, useEffect } = React;
const MARGIN_TOP = 70;

const TableOfContent = () => {
  const [categories, setCategoriies] = useState([]);
  const [currHeading, setCurrHeading] = useState(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const postContainer = document.querySelector('.post-container');
    if (!postContainer) {
      console.warn('"Post Container" Not Found.');
      return;
    }

    // find all h-doms
    const categories = postContainer.querySelectorAll('h1,h2,h3,h4,h5,h6');
    setCurrHeading(categories[0]);
    setCategoriies(Array.from(categories));
  }, []);

  // listen page scroll
  useEffect(() => {
    const scrollHandler = () => {
      const relativeTop = document
        .querySelector('#table-of-content')
        .getBoundingClientRect().top;

      setIsFixed(relativeTop <= MARGIN_TOP);
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const navTo = id => {
    const currHeading = document.querySelector(`#${id}`);
    currHeading.scrollIntoView({
      behavior: 'smooth',
    });
    setCurrHeading(currHeading);
  };

  const css = `
    .category-container {
      max-height: 60vh;
      overflow-y: auto;
    }
    .category-container.fixed {
      position: fixed;
      top: ${MARGIN_TOP}px;
    }
    .category {
      padding: 4px 0;
      font-size: 14px;
      font-family: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, 'PingFang SC', 'Hiragino Sans GB', STHeiti, 'Microsoft YaHei', 'Microsoft JhengHei', 'Source Han Sans SC', 'Noto Sans CJK SC', 'Source Han Sans CN', 'Noto Sans SC', 'Source Han Sans TC', 'Noto Sans CJK TC', 'WenQuanYi Micro Hei', SimSun, sans-serif";
      font-weight: bold;
      color: #b0b0b0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
      transition: all 1s;
    }
    .category.H1 {
      text-indent: 8px;
    }
    .category.H2 {
      text-indent: 16px;
    }
    .category.H3 {
      text-indent: 24px;
    }
    .category.H4 {
      text-indent: 32px;
    }
    .category.H5 {
      text-indent: 40px;
    }
    .category.H6 {
      text-indent: 48px;
    }
    .category.active {
      padding-right: 4px;
      color: #0085a1;
      background-color: #f8f8f8;
      border-radius: 4px;
    }
  `;

  return (
    <div className={`category-container ${isFixed ? 'fixed' : ''}`}>
      <style>{css}</style>
      {categories.map(i => (
        <div
          className={`category ${i.tagName} ${
            currHeading && currHeading.id === i.id ? 'active' : ''
          }`}
          onClick={() => navTo(i.id)}
        >
          {i.innerHTML}
        </div>
      ))}
    </div>
  );
};

// Mount
window.addEventListener('load', () => {
  const tableOfContentContainer = document.querySelector('#table-of-content');
  if (tableOfContentContainer) {
    ReactDOM.render(createElement(TableOfContent), tableOfContentContainer);
  }
});
