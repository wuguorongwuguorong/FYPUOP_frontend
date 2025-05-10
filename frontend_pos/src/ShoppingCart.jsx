import React from 'react';

const ShoppingCart = ({ cartItems }) => {
  return (
    <div>
      <h2>Your Shopping Cart</h2>
      <div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.menu_item_id}>
                <div>
                  <img
                    src={item.imageUrl ? `${import.meta.env.VITE_API_URL}${item.image_url}` : '/default-image.jpg'}
                    alt={item.productName}
                    className="cart-item-image"
                  />
                  <h4>{item.productName}</h4>
                  <p>Price: SGD {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
