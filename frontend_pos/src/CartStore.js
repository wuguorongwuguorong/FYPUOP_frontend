import { atom, useAtom } from 'jotai';
import axios from 'axios';
import Immutable from "seamless-immutable";
import { useEffect, useRef } from "react";
import { useJwt } from './UserStore';
import { produce } from 'immer';


// Define the initial state of the cart. We put in one piece of test data
const initialCart = Immutable([]);


// Create an atom for the cart
export const cartAtom = atom(initialCart);
export const cartLoadingAtom = atom(false);

export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);
    const [isLoading, setIsLoading] = useAtom(cartLoadingAtom);
    const { getJwt } = useJwt();

    // Function to calculate the total price of items in the cart
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const addToCart = (product) => {
        setCart(currentCart  => {
            const existingItemIndex = cart.findIndex(i => i.menu_item_id === product.menu_item_id);
            if (existingItemIndex !== -1) {
                // If the item exists, increase the quantity by 1
                 const updatedCart = [...currentCart]; // Create a shallow copy
                // updatedCart[existingItemIndex].quantity += 1;

                // existing item
                const modifiedCart = currentCart.updateIn([existingItemIndex, 'quantity'], quantity => quantity + 1);
                updateCart(modifiedCart);
                return modifiedCart;
            } else {
                // new item
                const modifiedCart = currentCart.concat({
                    ...product,
                    quantity: 1
                })
                updateCart(modifiedCart);
                return modifiedCart;
            }
        })
    }

    const modifyQuantity = (menu_item_id, quantity) => {
        setCart((currentCart) => {
            const existingItemIndex = currentCart.findIndex(item => item.menu_item_id === menu_item_id);
            if (quantity > 0) {
                // .setIn will return a modified copy of the original array
                const modifiedCart = currentCart.setIn([existingItemIndex, "quantity"], quantity);
                updateCart(modifiedCart);
                return modifiedCart;
            } else {
                const modifiedCart = currentCart.filter(cartItem => cartItem.menu_item_id != menu_item_id);
                updateCart(modifiedCart);
                return modifiedCart;
            }
        });
    }

    const removeFromCart = (menu_item_id) => {
        setCart((currentCart) => {
            const modifiedCart = currentCart.filter(cartItem => cartItem.menu_item_id != menu_item_id);
            updateCart(modifiedCart)
            return modifiedCart;
        });
    }

    const fetchCart = async () => {
        const jwt = getJwt();
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/cart/cart`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            setCart(response.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateCart = async (updatedCart) => {
        const jwt = getJwt();
        setIsLoading(true);
        try {
            const updatedCartItems = updatedCart.map(item => ({
                menu_item_id: item.menu_item_id,
                quantity: item.quantity,
                image_url : item.image_url
            })
            );
            console.log("Updating cart items:", updatedCartItems);
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cart/editcart`,
                { cartItems: updatedCartItems },
                { headers: { Authorization: 'Bearer ' + jwt } }
            );
        } catch (error) {
            console.error("Error updating cart:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        cart,
        getCartTotal,
        addToCart,
        modifyQuantity,
        removeFromCart,
        fetchCart,
        isLoading
    };
};
