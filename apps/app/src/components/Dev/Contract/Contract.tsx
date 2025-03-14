import { useEffect, useState } from 'react';

import { CreateContract, useContract } from '@/hooks';

export function Contract() {
  const { viewContract, createContract, testOptions } = useContract();
  const [contract, setContract] = useState<CreateContract>();
  const [pdfContent, setPdfContent] = useState<string>();

  useEffect(() => {
    if (pdfContent) viewContract({ containerId: 'contract', base64: pdfContent });
  }, [pdfContent]);

  return (
    <>
      <button onClick={() => setContract(createContract({ pdfOptions: testOptions }))}>create contract</button>
      <button onClick={contract?.open}>open contract</button>
      <button onClick={() => contract?.getBase64((base64) => setPdfContent(base64))}>display base64 pdf</button>
      <div id="contract" style={{ height: '100%' }}></div>;
    </>
  );
}
