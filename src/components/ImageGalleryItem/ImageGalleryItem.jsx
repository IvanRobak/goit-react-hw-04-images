import { Item, Img } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageItem = ({ webformatURL, largeImageURL, openModal }) => {
  return (
    <Item>
      <Img src={webformatURL} alt="" onClick={() => openModal(largeImageURL)} />
    </Item>
  );
};

ImageItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
