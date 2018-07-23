import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostList from 'components/shared/PostList';
import { PostsActions } from 'store/actionCreators';

class PostListContainer extends Component {
  load = async () => {
    PostsActions.loadPost();
  };

  componentDidMount() {
    this.load();
  }

  render() {
    return <PostList />;
  }
}

export default connect(({ posts }) => ({
  next: posts.next,
  data: posts.data
}))(PostListContainer);
