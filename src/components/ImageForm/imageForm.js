import { useState, useEffect } from 'react';
import SearchBar from 'components/Searchbar';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader/';

const ImageForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchImages();
  }, [searchQuery, page]);

  const toggleModal = (image = null) => {
    setShowModal(show => !show);
    setSelectedImage(image);
  };

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const fetchImages = async () => {
    const API_KEY = '34731072-348d9a1558c6b29bcd98e02ff';
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=12`
      );
      setImages(prevImages => [...prevImages, ...response.data.hits]);
      setLoading(false);
      setResponse(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const totalPage = response
    ? response.data.totalHits / response.data.hits.length
    : 0;

  return (
    <div>
      <SearchBar onSubmit={handleFormSubmit} />
      {loading && <Loader />}
      <ImageGallery images={images} onImageClick={toggleModal} />
      {totalPage > 1 && !loading && images.length !== 0 && (
        <Button onClick={loadMore} />
      )}
      <ToastContainer autoClose={3000} />
      {showModal && <Modal onClose={toggleModal} image={selectedImage} />}
    </div>
  );
};

export default ImageForm;
