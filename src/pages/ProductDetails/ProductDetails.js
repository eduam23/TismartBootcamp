import React, { useEffect, useState } from "react";
import MenuContent from "../../components/MenuContent/MenuContent";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import CourseContent from "../../components/CourseContent/CourseContent";
import StudentBought from "../../components/StudentBought/StudentBought";
import "./ProductDetails.css";
import CourseVideo from "../../components/CourseVideo/CourseVideo";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/ProductoService";




function ProductDetails() {

  const { id } = useParams();

  const [producto, setProducto] = useState({})

  const getProduct = async( id ) =>{
    let res = await getProductById(id);
    setProducto(res.data);
  }

  useEffect(() => {
    // fetch(`https://fakestoreapi.com/products/${id}`)
    //       .then(res=>res.json())
    //       .then(json=>setProducto(json))
    getProduct(id);
  }, [id])

  // console.log(producto);

  const {title, description, price, category, image, rating} = producto;


  return (
    <>
      <SideBar />
      <div className="productPageContent">
        <NavBar />
        <div className="productPageContent_groupSection">
          <section className="productoPage_pageContent_sectionOne">
            <CourseVideo titleProduct={title} urlImageProduct={image}/>
            <MenuContent descripProduct={description} priceProduct={price} categoryProduct={category}/>
          </section>
          <section className="productoPage_pageContent_sectionTwo">
            <CourseContent titleProduct={title} priceProduct={price} categoryProduct={category} rating={rating} />
            <StudentBought titleProduct={title} urlImageProduct={image} priceProduct={price}  />
          </section>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
