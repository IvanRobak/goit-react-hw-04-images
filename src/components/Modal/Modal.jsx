import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import { Overlay, ModalWindow, Button, Img } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  closeEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount = () => {
    window.addEventListener('keydown', this.closeEsc);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.closeEsc);
  };

  handleClickOverlay = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  handleClickButton = () => {
    this.props.closeModal();
  };

  render() {
    const { modalImage } = this.props;
    return createPortal(
      <Overlay onClick={this.handleClickOverlay}>
        {' '}
        <Button type="button" onClick={this.handleClickButton}>
          X
        </Button>
        <ModalWindow>
          <Img src={modalImage} alt="" />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalImage: PropTypes.string.isRequired,
};
