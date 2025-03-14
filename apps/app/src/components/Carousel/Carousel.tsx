import ImageGallery, { ReactImageGalleryProps } from 'react-image-gallery';
import styled from 'styled-components';

import { CarouselImageModel } from '@/models/carousel-image.model';

type CarouselProps = Omit<ReactImageGalleryProps, 'items'> & {
  images?: CarouselImageModel[];
  className?: string;
};

export const Carousel = (props: CarouselProps) => {
  const { images, className, ...galleryProps } = props;

  return (
    <CarouselRoot className={className}>
      <ImageGallery
        {...galleryProps}
        items={
          images?.map((images) => ({
            original: images.originalUrl,
            thumbnail: images.thumbnailUrl,
          })) ?? []
        }
      />
    </CarouselRoot>
  );
};

const CarouselRoot = styled.div`
  width: 100%;
  height: 585px;
  overflow: hidden;
  background-color: #8080806a;

  .image-gallery-content:not(.fullscreen) .image-gallery-image {
    height: 500px;
    padding-top: 5px;
  }

  .image-gallery-thumbnail-image {
    height: 62px;
    width: 92px;
    object-fit: cover;
    object-position: center;
  }
`;
