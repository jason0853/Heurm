import React from 'react';
import Textarea from 'react-textarea-autosize';
import './write-post.scss';
import Progress from 'components/home/Progress';

const WritePost = ({ onChange, onPost, value }) => {
  return (
    <div className="write-post">
      <Textarea
        minRows={3}
        maxRows={10}
        placeholder={
          '의식의 흐름대로 당신의 생각을 적어보세요.\n5초이상 아무것도 입력하지 않으면 자동으로 포스팅됩니다.'
        }
        onChange={onChange}
        value={value}
        onPaste={e => e.preventDefault()}
      />
      <Progress onPost={onPost} value={value} />
    </div>
  );
};

export default WritePost;
