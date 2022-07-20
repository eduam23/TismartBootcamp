import React, { useEffect, useState } from "react";
import MenuContent from "../../components/MenuContent/MenuContent";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import CourseContent from "../../components/CourseContent/CourseContent";
import StudentBought from "../../components/StudentBought/StudentBought";
import "./ProductDetails.css";
import CourseVideo from "../../components/CourseVideo/CourseVideo";



function ProductDetails({id = 0}) {

  const [producto, setProducto] = useState({})

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
          .then(res=>res.json())
          .then(json=>setProducto(json))
  }, [id])

  console.log(producto)

  const {title, description, price, category, image} = producto;

  return (
    <>
      <SideBar />

      <div className="productPageContent">
        <NavBar />

        <div className="productPageContent_groupSection">
          <section className="productoPage_pageContent_sectionOne">
            <CourseVideo titleProduct={title}/>
            <MenuContent descripProduct={description} priceProduct={price} categoryProduct={category}/>
          </section>

          <section className="productoPage_pageContent_sectionTwo">
            <CourseContent />
            <StudentBought titleProduct={title} urlImageProduct={image} priceProduct={price} />
          </section>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
