import styled from 'styled-components';

import { PRIVACY } from '../../constants/privacy.constant';

export type PrivacyProps = {
  onAgreedChange?: (value: boolean) => void;
  defaultAgreed?: boolean;
};

export const Privacy = ({ defaultAgreed = false, onAgreedChange }: PrivacyProps) => {
  return (
    <Container>
      <Title>Điều khoản và dịch vụ</Title>
      <Body>
        <Paragraph>
          {PRIVACY.map((it) => (
            <div key={it.title}>
              <SubTitle>{it.title}</SubTitle>
              <Text>{it.details}</Text>
            </div>
          ))}
        </Paragraph>
      </Body>
      <CheckboxGroup>
        <Checkbox
          defaultChecked={defaultAgreed}
          id="agree-checkbox"
          onChange={(e) => {
            onAgreedChange?.(e.target.checked);
          }}
        />
        <Label htmlFor="agree-checkbox">Tôi đồng ý với điều khoản trên</Label>
      </CheckboxGroup>
    </Container>
  );
};

const Container = styled.div``;
const Title = styled.h1``;
const Body = styled.div`
  padding: 16px 24px;
  border-radius: 16px;
  border: 1px solid gray;
  max-width: 1024px;
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
`;
const Paragraph = styled.span``;
const SubTitle = styled.h4`
  font-weight: bold;
  font-size: 20px;
`;
const Text = styled.span``;

const CheckboxGroup = styled.div`
  margin-top: 24px;
  align-items: center;
  display: flex;
  gap: 16px;
`;

const Label = styled.label``;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 24px;
  height: 24px;
`;
