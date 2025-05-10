import React from 'react';

const ProductCard = ({ menu_item_name, price, image_url, onAddToCart }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={image_url}
        className="card-img-top"
        alt={menu_item_name}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{menu_item_name}</h5>
        <p className="card-text text-muted">SGD {parseFloat(price).toFixed(2)}</p>
        <button className="btn btn-primary mt-auto" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
