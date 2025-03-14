import { useEffect } from 'react';
import styled from 'styled-components';

import { useContract } from '@/hooks';
import { PdfOptions } from '@/utils/generate-pdf.util';

export type ContractConfirmationProps = {
  contractOptions: PdfOptions;
  onAgreedChange?: (value: boolean) => void;
  getContract?: (contract: string) => void;
  defaultAgreed?: boolean;
};

export const ContractConfirmation = ({
  contractOptions,
  defaultAgreed = false,
  onAgreedChange,
  getContract,
}: ContractConfirmationProps) => {
  const { createContract, viewContract } = useContract();

  console.log(contractOptions);

  useEffect(() => {
    createContract({ pdfOptions: contractOptions }).getBase64((data) => {
      getContract?.(data);
      viewContract({ containerId: 'contract', base64: data });
    });
  }, []);

  return (
    <Container>
      <Title>Xem trước hợp đồng</Title>
      <Body>
        <ContractContainer />
      </Body>
      <CheckboxGroup>
        <Checkbox
          defaultChecked={defaultAgreed}
          id="agree-checkbox"
          onChange={(e) => {
            onAgreedChange?.(e.target.checked);
          }}
        />
        <Label htmlFor="agree-checkbox">Tôi đồng ý với nội dung của hợp đồng trên</Label>
      </CheckboxGroup>
    </Container>
  );
};

const Container = styled.div``;
const Title = styled.h2``;
const Body = styled.div`
  padding: 16px 24px;
  border-radius: 16px;
  max-width: 1024px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ContractContainer = styled.div.attrs({ id: 'contract' })`
  height: 1200px;
`;

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
