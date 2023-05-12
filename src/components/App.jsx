import { fetchGallery } from './Api/AxiosAPI';
import { ToastContainer } from 'react-toastify';
import { SearchBar } from '../components/Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { Modal } from '../components/Modal/Modal';
import { Container } from './App.styled';
import { Loader } from '../components/Loader/Loader';
import { LoadMore } from '../components/ButtonLoadMore/Button';

export const App = () => {
  const [query, setQuery] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsloading(true);
    fetchGallery(query, page)
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setShowLoadMore(page < Math.ceil(data.totalHits / 12));
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
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

  return (
    <Container>
      <SearchBar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} openModal={toggleModal} />
      {showLoadMore && (
        <LoadMore onLoadMore={handleLoadMore} />
      )}
      {showModal && <Modal closeModal={toggleModal} modalImage={modalImage} />}

      <ToastContainer autoClose={3500} />
    </Container>
  );
};
