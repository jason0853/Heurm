import React from 'react';
import Post from 'components/shared/Post';

const PostList = ({ posts }) => {
  const postList = posts.map(post => <Post key={post._id} post={post} />);

  return <div className="post-list">{postList}</div>;
};

export default PostList;
