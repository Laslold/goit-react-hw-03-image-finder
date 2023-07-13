import { Component } from 'react';
import { searchPosts } from '../services/post';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal/';
import Button from './Button';
import Loader from './Loader';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    totalHits: null,
    search: '',
    modalOpen: false,
    modalContent: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;
    if (page > prevState.page || search !== prevState.search) {
      this.fetchPosts();
    }
  }
  changeSearch = ({ search }) => {
    this.setState({
      search: search.trim(),
      items: [],
    });
  };
  async fetchPosts() {
    this.setState({
      loading: true,
    });
    const { search, page, items } = this.state;
    try {
      const data = await searchPosts(search, page);
      this.setState({
        items: [...items, ...data.hits],
        loading: false,
        totalHits: data.totalHits,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  }

  loadMore = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };
  showModal = modalContent => {
    this.setState({
      modalOpen: true,
      modalContent,
    });
  };
  closeModal = () => {
    this.setState({
      modalOpen: false,
    });
  };

  render() {
    const { items, loading, error, modalOpen, modalContent, totalHits } =
      this.state;
    const { loadMore, changeSearch, showModal, closeModal } = this;
    const errorLoad =
      error &&
      toast.error('Error with loading!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: 'colored',
      });
    const badLoad = totalHits === 0 && (
      <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Please enter a valid name or your search did not return any results
      </h2>
    );

    return (
      <div>
        {modalOpen && (
          <Modal close={closeModal}>
            <img src={modalContent.largeImageURL} alt={modalContent.tags} />
          </Modal>
        )}
        <Searchbar changeSearch={changeSearch} />
        {loading && <Loader />}
        {errorLoad}
        {badLoad}

        <ImageGallery items={items} showModal={showModal} />

        {!loading && items.length > 0 && items.length !== totalHits && (
          <Button onClick={loadMore} text="Load more" />
        )}
        <ToastContainer />
      </div>
    );
  }
}
export default App;
