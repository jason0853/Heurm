import React from 'react';
import Post from 'components/shared/Post';

const PostList = ({ posts }) => {
  const postList = posts.map(post => <Post key={post._id} post={post} />);

  return <ul className="post-list">{postList}</ul>;
};

export default PostList;
