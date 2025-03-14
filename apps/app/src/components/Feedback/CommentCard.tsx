import TimeAgo from 'javascript-time-ago';
import vi from 'javascript-time-ago/locale/vi.json';
import ReactTimeAgo from 'react-time-ago';
import styled from 'styled-components';

import { Avatar } from '../Common/Avatar';

TimeAgo.addDefaultLocale(vi);
TimeAgo.addLocale(vi);

type CommentCardProps = {
  name: string;
  content: string;
  timestamp: number;
};

export const CommentCard = (props: CommentCardProps) => {
  const { name, content, timestamp } = props;

  return (
    <Container>
      <AvatarContainer>
        <Avatar name={name} size={30} />
        <Sender>{name}</Sender>
        <Action>đã bình luận vào</Action>
        <Time>
          <ReactTimeAgo date={timestamp} locale="vi" timeStyle="twitter-minute-now" />
        </Time>
      </AvatarContainer>
      <Body>
        <Content>{content}</Content>
      </Body>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Body = styled.div`
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;

const Sender = styled.span`
  display: block;
  font-weight: bold;
`;

const Action = styled.span`
  color: #545454;
`;

const Time = styled.time`
  color: gray;
`;

const Content = styled.p`
  margin: 0;
`;

const AvatarContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  align-items: center;
`;
