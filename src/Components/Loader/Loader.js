import Loader from "react-loader-spinner";
import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const BildLoader = () => {
  return (
    <Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  );
};

export default BildLoader;
