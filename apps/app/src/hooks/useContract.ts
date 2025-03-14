import moment from 'moment';
import { useCallback } from 'react';

import { generatePdfContent, PdfOptions } from '@/utils/generate-pdf.util';

export const testOptions: PdfOptions = {
  code: 'test_contract',
  owner: { name: 'Trần Quốc Khánh', ioc: '123457', phoneNumber: '09055513099' },
  duration: 1,
  startDate: moment().startOf('days').toDate(),
  endDate: moment().startOf('days').add(30, 'days').toDate(),
  renter: { name: 'Hồ Hữu Tình', ioc: '123456', phoneNumber: '09055513095' },
  warehouse: {
    address: 'abc',
    area: 123,
    doors: 1,
    floors: 2,
    name: 'kho bai sieu dep',
    price: 2000,
  },
};

export type ViewContractOptions = {
  containerId: string;
  base64: string;
};

export type CreateContractOptions = {
  pdfOptions: PdfOptions;
};

export type CreateContract = {
  open: () => void;
  getBase64: (callback?: (base64: string) => void) => Promise<string>;
};

export function useContract() {
  const viewContract = useCallback((options: ViewContractOptions) => {
    _embedPdf(options.containerId, options.base64);
  }, []);

  const createContract = useCallback((options: CreateContractOptions): CreateContract => {
    const docDefinition = generatePdfContent(options.pdfOptions);
    const pdfDocGenerator = (window as any).pdfMake.createPdf(docDefinition);

    const open = () => {
      pdfDocGenerator.open();
    };

    const getBase64 = async (callback?: (base64: string) => void) => {
      return new Promise<string>((resolve) => {
        const resolveCallBack = (base64: string) => {
          resolve(base64);
          callback?.(base64);
        };

        pdfDocGenerator.getBase64(resolveCallBack);
      });
    };

    return {
      open,
      getBase64,
    };
  }, []);

  function _embedPdf(containerId: string, base64: string) {
    const containerElement = document.getElementById(containerId);

    if (containerElement === null) throw Error(`Element with id #${containerId} for map search box is not existed`);

    containerElement.innerHTML = '';

    const embed = document.createElement('embed');
    embed.src = `data:application/pdf;base64,${base64}`;
    embed.type = 'application/pdf';
    embed.width = '100%';
    embed.height = '100%';
    containerElement?.append(embed);
  }

  return { viewContract, createContract, testOptions };
}
