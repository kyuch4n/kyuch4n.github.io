'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _React = React,
    createElement = _React.createElement,
    useState = _React.useState,
    useEffect = _React.useEffect;


var TableOfContent = function TableOfContent() {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      categories = _useState2[0],
      setCategoriies = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      currHeading = _useState4[0],
      setCurrHeading = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isFixed = _useState6[0],
      setIsFixed = _useState6[1];

  useEffect(function () {
    var postContainer = document.querySelector('.post-container');
    if (!postContainer) {
      console.warn('"Post Container" Not Found.');
      return;
    }

    // find all h-doms
    var categories = postContainer.querySelectorAll('h1,h2,h3,h4,h5,h6');
    setCurrHeading(categories[0]);
    setCategoriies(Array.from(categories));
  }, []);

  // listen page scroll
  useEffect(function () {
    var scrollHandler = function scrollHandler() {
      var relativeTop = document.querySelector('#table-of-content').getBoundingClientRect().top;

      setIsFixed(relativeTop <= 10);
    };

    window.addEventListener('scroll', scrollHandler);
    return function () {
      return window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  var navTo = function navTo(id) {
    var currHeading = document.querySelector('#' + id);
    currHeading.scrollIntoView({
      behavior: 'smooth'
    });
    setCurrHeading(currHeading);
  };

  var css = '\n    .category-container {\n      max-height: 60vh;\n      overflow-y: auto;\n    }\n    .category-container.fixed {\n      position: fixed;\n      top: 10px;\n    }\n    .category {\n      padding: 4px 0;\n      font-size: 14px;\n      font-family: "-apple-system, BlinkMacSystemFont, \'Helvetica Neue\', Arial, \'PingFang SC\', \'Hiragino Sans GB\', STHeiti, \'Microsoft YaHei\', \'Microsoft JhengHei\', \'Source Han Sans SC\', \'Noto Sans CJK SC\', \'Source Han Sans CN\', \'Noto Sans SC\', \'Source Han Sans TC\', \'Noto Sans CJK TC\', \'WenQuanYi Micro Hei\', SimSun, sans-serif";\n      font-weight: bold;\n      color: #b0b0b0;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      cursor: pointer;\n      transition: all 1s;\n    }\n    .category.H1 {\n      text-indent: 8px;\n    }\n    .category.H2 {\n      text-indent: 16px;\n    }\n    .category.H3 {\n      text-indent: 24px;\n    }\n    .category.H4 {\n      text-indent: 32px;\n    }\n    .category.H5 {\n      text-indent: 40px;\n    }\n    .category.H6 {\n      text-indent: 48px;\n    }\n    .category.active {\n      padding-right: 4px;\n      color: #0085a1;\n      background-color: #f8f8f8;\n      border-radius: 4px;\n    }\n  ';

  return React.createElement(
    'div',
    { className: 'category-container ' + (isFixed ? 'fixed' : '') },
    React.createElement(
      'style',
      null,
      css
    ),
    categories.map(function (i) {
      return React.createElement(
        'div',
        {
          className: 'category ' + i.tagName + ' ' + (currHeading && currHeading.id === i.id ? 'active' : ''),
          onClick: function onClick() {
            return navTo(i.id);
          }
        },
        i.innerHTML
      );
    })
  );
};

// Mount
window.addEventListener('load', function () {
  var tableOfContentContainer = document.querySelector('#table-of-content');
  if (tableOfContentContainer) {
    ReactDOM.render(createElement(TableOfContent), tableOfContentContainer);
  }
});