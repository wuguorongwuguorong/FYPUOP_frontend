import React from 'react';

export default function ProductCard(props) {
  return (
    <>
      <div className="card h-100 shadow-sm">
        <img
           src={`${import.meta.env.VITE_API_URL}${props.image_url}`}
          className="card-img-top"
          alt={props.productName}
        />
        <div className="card-body">
          <h5 className="card-title">{props.productName}</h5>
          <p className="card-text">${(props.price)}</p>
          <a href="#" className="btn btn-primary" onClick={() => {
            console.log("added to cart");
            props.onAddToCart();
          }}>Add to Cart</a>
        </div>
      </div>

    </>
  );
};

