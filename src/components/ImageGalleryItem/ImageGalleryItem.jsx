import { Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, alt, onClick }) => {
  return <Image src={src} alt={alt} onClick={onClick} />;
};
