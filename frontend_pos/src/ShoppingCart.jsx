import React, { useEffect } from 'react';
import { useCart } from "./CartStore";
import { useJwt } from "./UserStore";
import axios from 'axios';

const ShoppingCart = () => {
    const { fetchCart, isLoading, getCartTotal} = useCart();

    useEffect(() => {
        fetchCart();
    }, []);

    const cart = getCart(); // Retrieve cart from the store

    const { getJwt } = useJwt();


    return (
        <div className="container mt-4">
            <h2>Shopping Cart</h2>
            {isLoading ? (
                <p>Loading cart...</p>
            ) : cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="list-group">
                        {cart.map((item) => (
                            <li
                                key={item.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <h5>{item.productName}</h5>
                                    <img src={item.imageUrl} alt={item.productName} />
                                    <div className="d-flex align-items-center mt-2">
                                        <input
                                            type="button"
                                            className="btn btn-sm btn-secondary me-2"
                                            value="-"
                                            onClick={() => modifyCart(item.product_id, item.quantity - 1)}
                                            disabled={isLoading}
                                        />
                                        <p className="mb-0">Quantity: {item.quantity}</p>
                                        <input
                                            type="button"
                                            className="btn btn-sm btn-secondary ms-2"
                                            value="+"
                                            onClick={() => addToCart(item)}
                                            disabled={isLoading}
                                        />
                                        <button
                                            className="btn btn-sm btn-danger ms-2"
                                            onClick={() => deleteCartItem(item.product_id)}
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
                </>
            )}
        </div>
    );
};

export default ShoppingCart;