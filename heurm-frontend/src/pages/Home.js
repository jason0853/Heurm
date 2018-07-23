import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import WritePostContainer from 'containers/home/WritePostContainer';
import PostListContainer from 'containers/shared/PostListContainer';

const Home = () => {
  return (
    <PageTemplate>
      <WritePostContainer />
      <PostListContainer />
    </PageTemplate>
  );
};

export default Home;
