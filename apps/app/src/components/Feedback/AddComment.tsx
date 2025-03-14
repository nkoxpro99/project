import { isEmpty } from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import styled from 'styled-components';

import { useAuthStore } from '@/auth';
import { ClientCommentModel } from '@/models/comment.model';

import { Avatar } from '../Common/Avatar';
import { Button } from '../Common/Button';
import { TextAreaAutoSize } from '../Common/TextArea';

type AddCommentProp = {
  onCommentSent?: (comment: ClientCommentModel) => void;
};

export const AddComment = ({ onCommentSent }: AddCommentProp) => {
  const [comment, setComment] = useState('');
  const { user } = useAuthStore();

  const handleCommentSent = () => {
    if (!isEmpty(comment)) {
      onCommentSent?.({ content: comment, senderName: 'Mock user', date: moment().format() });
      setComment('');
    }
  };

  return (
    <Container>
      <div>
        <Avatar name={user?.name} />
      </div>
      <Textarea
        cacheMeasurements
        placeholder="Nhập bình luận"
        rows={1}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={handleCommentSent}>Bình luận</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 16px;
  gap: 24px;
  align-items: center;
`;

const Textarea = styled(TextAreaAutoSize)`
  border-radius: 4px;
  padding: 16px;
  display: block;
  width: 100%;
  resize: none;
`;
