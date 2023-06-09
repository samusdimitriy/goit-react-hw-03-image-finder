import React, { Component } from 'react';
import { fetchImages } from '../../services/Api';
import { Container } from './App.styled';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import Modal from '../Modal/Modal';
import { Loader } from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    images: [],
    total: 0,
    currentPage: 1,
    searchQuery: '',
    error: null,
    status: 'idle',
    showModal: false,
    modalSrc: '',
    modalAlt: '',
  };

  componentDidMount() {
    this.setState({ status: 'resolved' });
  }

  async componentDidUpdate(_, prevState) {
    const { searchQuery, currentPage } = this.state;

    if (
      prevState.searchQuery !== searchQuery ||
      prevState.currentPage !== currentPage
    ) {
      this.fetchImagesFromApi()
        .then(({ hits, total }) => {
          this.setState(prevState => ({
            total,
            status: 'resolved',
            images: currentPage === 1 ? hits : [...prevState.images, ...hits],
          }));

          if (currentPage !== 1) {
            setTimeout(() => {
              this.scrollToBottom();
            }, 0);
          }

          setTimeout(() => {
            this.notifications();
          }, 0);
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  notifications() {
    const { error, status, images, total } = this.state;

    if (status === 'resolved') {
      console.log('notifications');

      if (images.length === 0) {
        toast.error(`Sorry, but we couldn't find any images for your request`);
      } else if (images.length === total) {
        toast.warning(
          `We found ${images.length} images for your request, but that's all we have`
        );
      } else {
        toast.success(`We found ${images.length} images for your request`);
      }
    } else if (status === 'rejected' && error) {
      toast.error(error.message);
    }
  }

  fetchImagesFromApi = async () => {
    const { searchQuery, currentPage } = this.state;

    try {
      const images = await fetchImages(searchQuery, currentPage);
      return images;
    } catch (error) {
      throw error;
    }
  };

  handleFormSubmit = query => {
    this.setState({ status: 'pending' });

    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      toast.error('Please enter your query!');
      this.setState({ status: 'idle' });

      return;
    }

    this.setState({
      searchQuery: trimmedQuery,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  handleImageClick = (src, alt) => {
    this.setState({
      showModal: true,
      modalSrc: src,
      modalAlt: alt,
    });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, showModal, modalSrc, modalAlt, error, status, total } =
      this.state;
    return (
      <Container>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'pending' && total > 0 && <Loader />}
        {status === 'rejected' && <h1>{error.message}</h1>}
        {status === 'resolved' && (
          <>
            {images.length > 0 && (
              <ImageGallery images={images} onClick={this.handleImageClick} />
            )}
            {!!images.length && this.state.total > images.length && (
              <Button onClick={this.handleLoadMore} />
            )}
            {showModal && (
              <Modal
                modalSrc={modalSrc}
                modalAlt={modalAlt}
                onClose={this.toggleModal}
              />
            )}
          </>
        )}
      </Container>
    );
  }
}

export default App;
