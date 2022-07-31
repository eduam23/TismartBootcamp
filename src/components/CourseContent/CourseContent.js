import React from 'react';
import './CourseContent.css';

function CourseContent({titleProduct = 'Cargando...', categoryProduct = 'Cargando...', priceProduct = '0.00', rating = {rate:'0.00', count:'0.00'}}) {
  return (
    <div className='courseContent'>
      <h3>Product Content</h3>
      <div className='courseContent_card'>
        <p>Title: </p>
        <span>{titleProduct}</span>
      </div>
      <div className='courseContent_card'>
        <p>Category: </p>
        <span>{categoryProduct}</span>
      </div>
      <div className='courseContent_card'>
        <p>Price: </p>
        <span>s/. {priceProduct}</span>
      </div>
      <div className='courseContent_card'>
        <p>Rate: </p>
        <span>{rating.rate}</span>
      </div>
      <div className='courseContent_card'>
        <p>Count: </p>
        <span>{rating.count}</span>
      </div>
    </div>
  )
}

export default CourseContent