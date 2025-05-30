import React, { useEffect } from 'react';
import { useCart } from "./CartStore";
import { useJwt } from "./UserStore";
//import axios from 'axios';

const ShoppingCart = () => {
    const { cart, fetchCart, addToCart, getCartTotal, modifyQuantity, removeFromCart, isLoading } = useCart();

    //const cart = getCart(); // Retrieve cart from the store

    const { getJwt } = useJwt();

    // Fetch the cart data when the component mounts
    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Ordering Cart</h2>
            {isLoading ? (
                <p>Loading cart...</p>
            ) : cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="list-group">
                        {cart.map((item) => (
                            <li key={item.order_item_id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <img src={item.image_url} alt={item.productName} className="cart-image" />
                                    <h5>{item.productName}</h5>
                                    <div className="d-flex align-items-center mt-2">
                                        <input
                                            type="button"
                                            className="btn btn-sm btn-secondary me-2"
                                            value="-"
                                            onClick={() => modifyQuantity(item.menu_item_id, item.quantity - 1)}
                                            disabled={isLoading}
                                        />
                                        <p className="mb-0">Quantity: {item.quantity}</p>
                                        <input
                                            type="button"
                                            className="btn btn-sm btn-secondary ms-2"
                                            value="+"
                                            onClick={() => modifyQuantity(item.menu_item_id, item.quantity + 1)}
                                            disabled={isLoading}
                                        />
                                        <button
                                            className="btn btn-sm btn-danger ms-2"
                                            onClick={() => removeFromCart(item.menu_item_id)}
                                            disabled={isLoading}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-3 text-end">
                        <h4>Total: ${getCartTotal()}</h4>
                    </div>
                </>
            )}
        </div>
    );
};

export default ShoppingCart;