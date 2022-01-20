import React from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ src, alt, onClose }) {
  console.log(src.alt);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  crs: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
