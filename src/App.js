import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import Searchbar from "./Components/Searchbar";
import { fetchPhoto } from "./services/photo-api";
import ImageGallery from "./Components/ImageGallery";
import BildLoader from "./Components/Loader/Loader";
import Button from "./Components/Button";
import Modal from "./Components/Modal/Modal";

function App() {
  const [photoName, setPhotoName] = useState("");
  const [photoList, setPhotoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activePhoto, setActivePhoto] = useState({});

  useEffect(() => {
    if (photoList === []) {
      return;
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [photoList]);

  useEffect(() => {
    if (photoName === "") {
      return;
    }
    setIsLoading(true);
    const getImages = async () => {
      try {
        const images = await fetchPhoto(photoName, currentPage);
        setPhotoList((photoList) => [...photoList, ...images]);
      } catch (error) {
        setError({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    };
    getImages();
  }, [photoName, currentPage]);

  const findActivePhoto = (imgId) => {
    setActivePhoto(photoList.find((photo) => photo.id === imgId));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const shouldRenderLoadMoreButton = photoList.length > 0 && !isLoading;
  const { largeImageURL, tags } = activePhoto;
  return (
    <>
      <Searchbar onSubmit={setPhotoName(photoName)} />
      <ImageGallery
        gallery={photoList}
        onClose={toggleModal}
        clickPhoto={findActivePhoto}
      />
      {isLoading && <BildLoader />}
      {shouldRenderLoadMoreButton && (
        <Button foundMore={setCurrentPage((currentPage) => currentPage + 1)} />
      )}
      {showModal && (
        <Modal onClose={toggleModal} crs={largeImageURL} alt={tags} />
      )}
    </>
  );
}

export default App;
