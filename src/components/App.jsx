import { fetchGallery } from './Api/AxiosAPI';
import { ToastContainer } from 'react-toastify';
import { SearchBar } from '../components/Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
// import { ImageItem } from '../components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../components/Modal/Modal';
import { Container } from './App.styled';
import { Loader } from '../components/Loader/Loader';
import { LoadMore } from '../components/ButtonLoadMore/Button';
// import Image from './ImageGalleryItem';
export const App = () => {
  const [query, setQuery] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [totalHits, setTotalHits] = useState();

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsloading(true);
    fetchGallery(query, page)
      .then(data => {
        setImages(prevState =>
          page === 1 ? [...data.hits] : [...prevState, ...data.hits]
        );
        setTotalHits(prevState =>
          page === 1 ? prevState - data.hits.length : [...data.hits].length
        );
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const toggleModal = modalImage => {
    if (!modalImage) {
      setModalImage('');
      setShowModal(false);
      return;
    }
    setModalImage(modalImage);
    setShowModal(true);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  // const { handleFormSubmit, toggleModal, handleLoadMore } = this;
  // const { isLoading, images, totalHits, showModal, modalImage } = this.state;
  return (
    <Container>
      <SearchBar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} openModal={toggleModal} />
      {!!totalHits && <LoadMore onLoadMore={handleLoadMore} />}
      {showModal && <Modal closeModal={toggleModal} modalImage={modalImage} />}

      <ToastContainer autoClose={2500} />
    </Container>
  );
};
