import styled, { css } from 'styled-components';

type AvatarProps = {
  name?: string;
  size?: number;
};

export const Avatar = (props: AvatarProps) => {
  const { name } = props;
  const nameChars = name ? name.split(' ') : ['Guest'];

  const getName = () => {
    const first = nameChars.length > 0 ? nameChars[0][0] : '';
    const second =
      nameChars.length === 0
        ? ''
        : nameChars.length === 1
        ? nameChars[0].length > 0
          ? nameChars[0][1]
          : ''
        : nameChars[nameChars.length - 1][0];

    return `${first}${second}`;
  };

  return <Container $size={props.size}>{getName()}</Container>;
};

const Container = styled.div<{ $size?: number }>`
  background-color: rgba(0, 0, 0, 0.2);
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

Container.defaultProps = { $size: 50 };
