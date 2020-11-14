import React, { FC, useEffect, useRef, useState } from 'react';
import { Empty, Input, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
import FuzzySearch from 'fuzzy-search';
import axios from '../../utils/axios';
import './index.scss';

interface BaseDataItem {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string;
  date: string;
  url: string;
}

const App: FC = () => {
  const [keyword, setKeyword] = useState('');
  const [baseData, setBaseData] = useState<BaseDataItem[]>([]);
  const [searchRes, setSearchRes] = useState<BaseDataItem[]>([]);
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    (async () => {
      const data: BaseDataItem[] = await axios.get('/search.json');
      setBaseData(data);
    })();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSearch = (keyword: string) => {
    const keys = Object.keys(baseData?.[0] || {});
    const searcher = new FuzzySearch(baseData, keys, {
      caseSensitive: false,
    });
    const data = searcher.search(keyword);

    setKeyword(keyword);
    setSearchRes(data);
  };

  const renderTags = (tagStr: string) => {
    const bgColorReset = ['#55acee', '#cd201f', '#3b5999', '#55acee'];
    const tags = tagStr?.split(',') || [];

    return tags.length ? (
      <div className="search-result-item__tags">
        {tags.map((tag, index) => (
          <Tag key={index} color={bgColorReset[Math.floor(Math.random() * 4)]}>
            {tag}
          </Tag>
        ))}
      </div>
    ) : (
      undefined
    );
  };

  const linkTo = (url: string) => {
    window.location.href = `https://kyuch4n.github.io${url}`;
  };

  const backTo = () => {
    window.history.go(-1);
  };

  return (
    <div className="search-engine-container">
      <div className="back-header" onClick={backTo}>
        <ArrowLeftOutlined className="back-header__icon" />
        <span className="back-header__title">BACK</span>
      </div>
      <div className="search-engine-input">
        <Input
          value={keyword}
          ref={inputRef}
          placeholder=" $ grep ..."
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      <div className="search-engine-result">
        {keyword &&
          (searchRes?.length ? (
            <QueueAnim delay={300}>
              {searchRes.map(i => (
                <div
                  className="search-result-item"
                  key={i.url}
                  onClick={() => linkTo(i.url)}
                >
                  <div className="search-result-item__title">{i.title}</div>
                  {i.subtitle && (
                    <div className="search-result-item__subtitle">
                      {i.subtitle}
                    </div>
                  )}
                  {renderTags(i.tags)}
                </div>
              ))}
            </QueueAnim>
          ) : (
            <Empty description={false} />
          ))}
      </div>
    </div>
  );
};

export default App;
