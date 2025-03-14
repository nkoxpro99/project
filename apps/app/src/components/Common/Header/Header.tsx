import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { privateApi } from '@/axios/axios';

import { useAuthStore } from '../../../auth';
import { Button } from '../Button';
import { Logo } from '../Logo/Logo';

const Container = styled.header`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.108);
  display: flex;
  justify-content: space-between;
`;

const Nav = styled.nav`
  padding: 15px 30px;
`;

const UlContainerRight = styled.ul`
  display: flex;
  flex-direction: row-reverse;
  gap: 12px;
  list-style-type: none;
  margin: 0;
`;

const RightSideItem = styled.li`
  border-radius: 4px;
  padding: 4px 20px;
  border: 1px solid #505050;
  cursor: pointer;
`;

const LeftSide = styled.div`
  display: flex;
`;

const UlContainerLeft = styled.ul`
  display: flex;
  gap: 16px;
  list-style-type: none;
  margin: 0;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const LeftSideItem = styled.li`
  padding: 4px 20px;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: border-color 0.5s ease;

  &:hover {
    border-color: red;
  }
`;

const RightSide = styled.div``;

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore(({ isAuthenticated, user, logout }) => ({
    isAuthenticated,
    user,
    logout,
  }));

  const navigate = useNavigate();

  const handleLogout = () => {
    privateApi.post('auth/revoke-token').catch((e) => console.error(e));
    logout();
    navigate('/login');
  };

  console.log(isAuthenticated);

  return (
    <Container>
      <LeftSide>
        <Link to={'/home'}>
          <Logo />
        </Link>
        <Nav>
          <UlContainerLeft>
            <Link to={'/home'}>
              <LeftSideItem>Trang chủ</LeftSideItem>
            </Link>
            {isAuthenticated && (
              <Link to={'/list'}>
                <LeftSideItem>Kho bãi của tôi</LeftSideItem>
              </Link>
            )}
          </UlContainerLeft>
        </Nav>
      </LeftSide>
      <RightSide>
        <Nav>
          {isAuthenticated === undefined ? (
            <></>
          ) : isAuthenticated === true ? (
            <UserContainer>
              <div>{`Hi, ${user?.name}`}</div>
              <Button onClick={handleLogout}>Đăng xuất</Button>
            </UserContainer>
          ) : (
            <UlContainerRight>
              <Link to={'/sign-up'}>
                <RightSideItem>Đăng ký</RightSideItem>
              </Link>
              <Link to={'/login'}>
                <RightSideItem>Đăng nhập</RightSideItem>
              </Link>
            </UlContainerRight>
          )}
        </Nav>
      </RightSide>
    </Container>
  );
};
