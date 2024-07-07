import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from "./App.module.css";
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchPhotos } from "./unsplash-photos-api";
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';

function App() {

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [totalPages, setTotalPages] = useState(99);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleSearch = async (newSearchCriteria) => {
    setPhotos([]);
    setPage(1);
    setTotalPages(0);
    setSearchCriteria(newSearchCriteria);
    // console.log("App: handleSearch page", page);
  }

  const handleLoadMore = () => {
    setPage(page + 1);
    // console.log("App: handleLoadMore page", page);
  }

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    if (searchCriteria === "") {
      return;
    }
    async function getPhotos() { 
      try {
        setLoading(true);
        setError(false);
        const data = await fetchPhotos(searchCriteria, page);
        const results = data.results;
        setTotalPages(data.total_pages);
        console.log("App: getPhotos() totalPages", totalPages);
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...results];
        });
      } catch (error) {
        setError(true);
        toast.error("Error photo loading!");
      } finally {
      setLoading(false);
      }
    }
    getPhotos();
  }, [page, searchCriteria])

  return (
    <>
      <SearchBar onSearch={handleSearch} getTotalPages={totalPages } /> 
      {photos.length > 0 && <ImageGallery items={photos} openModal={openModal} />}
      {loading && <Loader />}
      {error && <ErrorMessage/>}
      {photos.length > 0 && !loading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {page >= totalPages && totalPages !== 0 &&
        <div className={css.endMsgDiv}>
          <p className={css.endMsgP}>You reached the end of search results</p>
        </div>}
      <ImageModal isOpen={modalIsOpen} onRequestClose={closeModal} photo={selectedPhoto} />
      <Toaster position='bottom-right'/>
    </>
  )
}

export default App
