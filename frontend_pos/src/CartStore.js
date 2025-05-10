import { atom, useAtom } from 'jotai';
import axios from 'axios';
import Immutable from 'seamless-immutable';
import { useEffect, useRef } from 'react';
import { useJwt } from './UserStore';

// Define the initial state of the cart
const initialCart = Immutable([]);

// Create an atom for the cart
export const cartAtom = atom(initialCart);
export const cartLoadingAtom = atom(false);

// Custom hook for cart operations
export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);
    const [isLoading, setIsLoading] = useAtom(cartLoadingAtom);
    const { getJwt } = useJwt();
    const isInitialLoad = useRef(true);

    useEffect(() => {
        fetchCart();
    }, []);

    // Function to calculate the total price of items in the cart
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    // Function to add an item to the cart
    const addToCart = (m) => {
        setCart((currentCart) => {
            const existingItemIndex = currentCart.findIndex((i) => i.menu_item_id === m.menu_item_id);
            if (existingItemIndex !== -1) {
                let newQuantity = currentCart[existingItemIndex].quantity + 1;
                const updatedCart = [...currentCart];
                updatedCart[existingItemIndex].quantity = newQuantity;
                return updatedCart;
            } else {
                return currentCart.concat({
                    ...m,
                    quantity: 1,
                });
            }
        });
    };


    // Function to fetch the cart from the backend
    const fetchCart = async () => {
        const jwt = getJwt();
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            setCart(Immutable(response.data));
        } catch (error) {
            console.error('Error Fetching Cart', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        cart,
        fetchCart,
        getCartTotal,
        addToCart,

    };
};
