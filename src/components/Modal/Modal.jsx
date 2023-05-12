import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Overlay, ModalWindow, Button, Img } from '../Modal/Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, modalImage }) => {
  useEffect(() => {
    const closeEsc = e => {
      if (e.code === 'Escape') {
        return closeModal();
      }
    };
    window.addEventListener('keydown', closeEsc);
    return () => {
      window.removeEventListener('keydown', closeEsc);
    };
  }, [closeModal]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <Button type="button" onClick={() => closeModal()}>
        X
      </Button>
      <ModalWindow>
        <Img src={modalImage} alt="" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalImage: PropTypes.string.isRequired,
};
