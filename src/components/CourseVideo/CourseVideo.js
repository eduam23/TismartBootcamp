import React from "react";
import "./CourseVideo.css";

function CourseVideo({titleProduct = 'Cargando...'}) {
  return (
    <div className="courseVideoContent">
      <h1>Product</h1>
      <h2>{titleProduct}</h2>
      <div className="courseVideoContent_reactPlayer">
        <iframe className="courseVideoContent_reactPlayerContent" src="https://www.youtube.com/embed/TUZNMq5sXhk" title="YouTube video player" frameborder="0" autoplay allowfullscreen ></iframe>
      </div>
    </div>
  );
}

export default CourseVideo;
