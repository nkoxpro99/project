import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Loading } from '@/components/Fallback';

import { useAuthStore } from '../../auth';
import { AuthenticateResponse } from '../../auth/models';
import { privateApi } from '../../axios/axios';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authenticate] = useAuthStore((state) => [state.authenticate]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    privateApi
      .post<AuthenticateResponse>('auth/login', { Email: email, Password: password })
      .then(({ data, status }) => {
        if (status === 200) {
          const { jwtToken, id, name, role } = data;
          authenticate({ token: jwtToken, user: { id, name, role } });
          navigate('/home');
        } else {
          setLoading(false);
        }
      })
      .catch((e) => {
        setError('Đăng nhập thất bại, vui lòng thử lại.');
        setLoading(false);
      });
  };

  return (
    <FormContainer>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && (
          <Error>
            <p>{error}</p>
          </Error>
        )}
        <Button disabled={isLoading} type="submit">
          {isLoading ? <Loading size={25} /> : 'Login'}
        </Button>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  width: 200px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
`;

const Error = styled.div`
  margin-top: 5px;
  color: red;
  font-style: italic;
  font-size: 0.8rem;

  p {
    margin: 0;
  }
`;
