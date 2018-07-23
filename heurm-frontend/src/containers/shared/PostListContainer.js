import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostList from 'components/shared/PostList';
import { PostsActions } from 'store/actionCreators';

class PostListContainer extends Component {
  prev = null;

  load = async () => {
    try {
      await PostsActions.loadPost();
      const { next } = this.props;

      if (next) {
        await PostsActions.prefetchPost(next);
      }
    } catch (err) {
      console.log(err);
    }
  };

  loadNext = async () => {
    const { next } = this.props;

    PostsActions.showPrefetchedPost();

    if (next === this.prev || !next) return;

    this.prev = next;

    try {
      await PostsActions.prefetchPost(next);
    } catch (err) {
      console.log(err);
    }

    this.handleScroll();
  };

  handleScroll = () => {
    const { nextData } = this.props;
    if (nextData.size === 0) return;

    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (scrollHeight - innerHeight - scrollTop < 100) {
      this.loadNext();
    }
  };

  componentDidMount() {
    this.load();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { data } = this.props;

    return <PostList posts={data} />;
  }
}

export default connect(({ posts }) => ({
  next: posts.next,
  data: posts.data,
  nextData: posts.nextData
}))(PostListContainer);
