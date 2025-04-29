import React from 'react';

const ProductCard = (props) => {
  return (
    <div className="card">
      <img
        src={props.image_url}
        className="card-img-top"
        alt={props.menu_item_name}
      />
      <div className="card-body">
        <h5 className="card-title">{props.menu_item_name}</h5>
        <p className="card-text">${props.menu_item_price}</p>
        <button className="btn btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;