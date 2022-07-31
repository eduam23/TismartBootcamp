import React from "react";
import { URL_IMG_PLACEHOLDER } from "../../utils/Config";
import "./CourseVideo.css";

function CourseVideo({titleProduct = 'Cargando...', urlImageProduct = URL_IMG_PLACEHOLDER}) {
  return (
    <div className="courseVideoContent">
      <h1>Product</h1>
      <h2>{titleProduct}</h2>
      <div className="courseVideoContent_reactPlayer">
        {/* <iframe className="courseVideoContent_reactPlayerContent" src="https://www.youtube.com/embed/TUZNMq5sXhk" title="YouTube video player" frameborder="0" autoplay allowfullscreen ></iframe> */}
        <img className="courseVideoContent_reactPlayerContent" src={urlImageProduct} alt="productImage" />
      </div>
    </div>
  );
}

export default CourseVideo;
