import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import WritePost from 'components/home/WritePost';
import { HomeActions } from 'store/actionCreators';

class WritePostContainer extends Component {
  handleChange = e => {
    HomeActions.changeWritePostInput(e.target.value);
  };

  handlePost = async () => {
    const { value } = this.props;

    const message = message => (
      <div style={{ fontSize: '1.1rem' }}>{message}</div>
    );

    if (value.length < 5) {
      HomeActions.changeWritePostInput('');
      return toast(message('너무 짧습니다. 5자 이상 입력하세요.'), {
        type: 'error'
      });
    }

    if (value.length > 1000) {
      HomeActions.changeWritePostInput('');
      return toast(message('최대 1000자까지 입력 할 수 있습니다.'), {
        type: 'error'
      });
    }

    try {
      await HomeActions.writePost(value);
      toast(message('생각이 작성되었습니다.'), { type: 'success' });
    } catch (e) {
      toast(message('오류가 발생했습니다.'), { type: 'error' });
    }
  };

  render() {
    const { handleChange, handlePost } = this;
    const { value } = this.props;

    return (
      <WritePost value={value} onChange={handleChange} onPost={handlePost} />
    );
  }
}

export default connect(({ home }) => ({
  value: home.writePost.value
}))(WritePostContainer);
