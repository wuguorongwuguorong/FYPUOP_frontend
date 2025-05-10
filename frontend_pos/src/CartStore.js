import { atom, useAtom } from 'jotai';
import axios from  'axios';
import Immutable from "seamless-immutable";
import { useEffect,useRef } from "react";
import { useJwt } from './UserStore';


// Define the initial state of the cart. We put in one piece of test data
const initialCart = Immutable([]);


// Create an atom for the cart
export const cartAtom = atom(initialCart);
export const cartLoadingAtom = atom(false);

console.log(cartLoadingAtom)

// Custom hook for cart operations
export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);
    const [isLoading, setIsLoading] = useAtom(cartLoadingAtom);
    const { getJwt } = useJwt();
    const isInitialLoad= useRef(true);

    useEffect(()=> {
        fetchCart();
    }, [])

    useEffect(() => {
		    
    
        const debounceTimeout = setTimeout(() => {
            updateCart();
        }, 500); // Adjust debounce delay as needed

        // Cancel the previous timeout if cart changes or component unmounts
        return () => clearTimeout(debounceTimeout); 
    }, [cart]); // Depend on the cart state

    // Function to calculate the total price of items in the cart
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const addToCart = (product) => {
        setCart(currentCart => {
            // find if the item already exists in the shopping item
            // important - we assume `product_id` is the id of the product
            const existingItemIndex = cart.findIndex(i => i.menu_item_id === m.menu_item_id);
            if (existingItemIndex !== -1) {
                let newQuantity = cart[existingItemIndex].quantity + 1;

                // existing item
                const modifiedCart = currentCart.setIn([existingItemIndex, 'quantity'], newQuantity);
                return modifiedCart;
            } else {
                // new item
                return currentCart.concat({
                    ...product,
                    quantity: 1
                })
            }
        })
    }
    const modifyQuantity = (menu_item_id, quantity) => {
        setCart((currentCart) => {
            const existingItemIndex = currentCart.findIndex(item => item.menu_item_id === menu_item_id);
            if (existingItemIndex !== -1) {

                // check if the quantity will be reduced to 0 or less, if so remove the item
                if (quantity < 0) {
                    return currentCart.filter(item => item.menu_item_id !== menu_item_id);
                } else {
                    return currentCart.setIn([existingItemIndex, 'quantity'], quantity);
                }

            }
        });
    }
    const removeFromCart = (menu_item_id) => {
        setCart((currentCart) => {
            return currentCart.filter(item => item.menu_item_id !== menu_item_id);
        });
    }

    const fetchCart = async () => {
        const jwt = getJwt();
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/cart`,
                {
                    headers:{
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
                setCart(Immutable(response.data));
        } catch (error) {
            console.error("Error Fetching Cart", error);
        } finally {
            setIsLoading(false);
        }
    }

    const updateCart = async () => {
        const jwt = getJwt();
        setIsLoading(true);
        try {
            const updatedCartItems = cart.map((item) => ({
                menu_item_id: item.menu_item_id,
                quantity: item.quantity,
            }));
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cart/editcart`,
                { cartItems: updatedCartItems },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
        } catch (error) {
            console.error("Error updating cart:", error);
        } finally {
            setIsLoading(false);
        }
    };
   

    return {
        cart,
        getCartTotal,
        addToCart,
        modifyQuantity,
        removeFromCart,
        fetchCart
    };
};