import { violetDark } from '@radix-ui/colors';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { CarouselImageModel } from '@/models/carousel-image.model';

type UploadImageButtonProps = {
  onImageUploaded?: (url: CarouselImageModel[]) => void;
  urls?: CarouselImageModel[];
};

export const UploadImageButton = (props: UploadImageButtonProps) => {
  const { onImageUploaded, urls = [] } = props;
  const [files, setFiles] = useState<CarouselImageModel[]>([]);
  const [widget, setWidget] = useState<any>(null);

  console.log('outside', files);

  useEffect(() => {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: 'dy6dehxix',
        uploadPreset: 'nt12lmzm',
      },
      (error: Error, result: any) => {
        console.log('inside', files);

        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);

          const { thumbnail_url: thumbnailUrl, secure_url: url } = result.info;
          const carouselImage = {
            originalUrl: url,
            thumbnailUrl: thumbnailUrl,
          };

          setFiles(
            produce((files) => {
              files.push(carouselImage);
            }),
          );
        }
      },
    );

    setWidget(widget);
  }, []);

  useEffect(() => {
    if (files) {
      onImageUploaded?.(files);
    }
  }, [files]);

  return (
    <>
      <UploadButton
        onClick={() => {
          if (!widget) {
            return;
          } else {
            widget!.open();
          }
        }}
      >
        <label>Thêm ảnh</label>
      </UploadButton>
      <ImageContainer $hasSrc={!!files.length}>
        {files.length ? files.map((it) => <Image key={it.originalUrl} src={it.originalUrl} />) : <></>}
      </ImageContainer>
    </>
  );
};

const UploadButton = styled.div`
  padding: 8px 16px;
  background-color: ${violetDark.violet10};
  border-radius: 8px;
  width: fit-content;
  color: white;
  cursor: pointer;

  label {
    cursor: pointer;
  }
`;

const ShowImageStyle = css`
  height: fit-content;
  padding: 4px;

  img {
    height: 120px;
    width: 120px;
  }
`;

const ImageContainer = styled.div<{ $hasSrc?: boolean }>`
  height: 0;
  ${({ $hasSrc }) => ($hasSrc ? ShowImageStyle : '')}
  margin: 0 auto;
  margin-top: 8px;
  border-radius: 16px;
  display: flex;
  gap: 8px;
`;

const Image = styled.img.attrs({ id: 'uploaded-image' })`
  border-radius: 16px;
  object-fit: cover;
  object-position: center;
`;
