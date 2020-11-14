import React, { FC, useEffect } from 'react';

interface IProps {
  title: string;
}

const App: FC<IProps> = props => {
  const { title, children } = props;

  useEffect(() => {
    document.title = title;
  }, [title]);

  return <>{children}</>;
};

export default App;
