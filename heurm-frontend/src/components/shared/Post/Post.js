import React from 'react';
import './post.scss';

import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const formatter = buildFormatter(koreanStrings);

const Post = ({ post }) => {
  const { count, username, content, comments, likesCount, createdAt } = post;
  return (
    <li className="post">
      <div className="head">
        <div
          className="post-thumbnail"
          style={{
            backgroundImage: `url(/api/users/${username}/thumbnail)`
          }}
        />
        <div className="post-username">{username}</div>
        <div className="post-count">#{count}번째 생각</div>
        <div className="post-time">
          <TimeAgo date={createdAt} formatter={formatter} />
        </div>
      </div>
      <div className="post-content">{content}</div>
    </li>
  );
};

export default Post;
