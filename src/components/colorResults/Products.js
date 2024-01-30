import React from 'react'
import "./aboutUs.scss"

export default function Products({ backgroundColor }) {
  const products = [
    { name: 'Product 1', imageSrc: '/backgroundColor/product.jpg' },
    { name: 'Product 2', imageSrc: '/backgroundColor/product.jpg' },
    { name: 'Product 3', imageSrc: '/backgroundColor/product.jpg' },
  ];

  return (

    <div className="products-content" style={{backgroundColor: backgroundColor}}>

      <div className="products-top" style={{ textAlign: 'center' }}>
        <h1>Our products</h1>
        <p>The greatest glory in living lies not in never falling, <br/>but in rising every time we fall.</p>
          {/* <p>The way to get started is to quit talking and begin doing.</p>
          <p>Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma  <br/>
            – which is living with the results of other people's thinking.</p> */}
      </div>

      <div className='products-bottom'>
        {products.map((p, index) => (
          <div key={index} className='product-box'>
            <h4>{p.name}</h4>
            <img src='../../' />
          </div>
        ))}
      </div>
 
  </div>
  );
};
