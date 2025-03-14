import { produce } from 'immer';
import moment from 'moment';
import { useState } from 'react';
import styled from 'styled-components';

import { CommentModel } from '@/models/comment.model';

import { ClientCommentModel } from '../../models/comment.model';
import { AddComment } from './AddComment';
import { CommentCard } from './CommentCard';

export type CommentSectionProps = {
  data?: ClientCommentModel[];
  resolveComment: (comment: ClientCommentModel) => Promise<CommentModel>;
};

export const CommentSection = ({ data = [], resolveComment }: CommentSectionProps) => {
  const [comments, setComments] = useState<ClientCommentModel[]>(
    data.sort((a, b) => moment(b.date).diff(moment(a.date))),
  );

  return (
    <CommentRoot>
      <AddComment
        onCommentSent={(comment) =>
          resolveComment(comment).then((resolved) => {
            setComments(
              produce((comments) => {
                comments.unshift(resolved);
              }),
            );
          })
        }
      />

      <List>
        {comments.map((it, index) => (
          <CommentCard key={index} content={it.content} name={it.senderName} timestamp={moment(it.date).valueOf()} />
        ))}
      </List>
    </CommentRoot>
  );
};

const CommentRoot = styled.div`
  width: 100%;
`;

const List = styled.div`
  padding: 0 10px;
  margin-bottom: 24px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;
