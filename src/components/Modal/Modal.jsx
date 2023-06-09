import { Component } from 'react';
import { ModalWrapper, Overlay, ModalImg } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    this.props.onClose();
  };

  render() {
    return (
      <Overlay onClick={this.handleOverlayClick}>
        <ModalWrapper>
          <ModalImg src={this.props.modalSrc} alt={this.props.modalAlt} />
        </ModalWrapper>
      </Overlay>
    );
  }
}

export default Modal;
