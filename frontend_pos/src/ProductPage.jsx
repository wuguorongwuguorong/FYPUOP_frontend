import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from './CartStore';
import ProductCard from './ProductCard'

import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';

function ProductPage() {

  const [products, setProducts] = useState([])
  const { addToCart } = useCart();
  const [, setLocation] = useLocation();
  const { showMessage } = useFlashMessage();

  const handleAddToCart = (menu) => {
    addToCart({
      menu_id: menu.menu_item_id,
      menu_name: menu.menu_item_name,
      imageUrl: menu.image_url,
      price: menu.menu_item_price,
  
    });
    showMessage("Product added to cart", "success");
    setLocation("/cart");

    setTimeout(() => {
      setLocation("/products"); // Replace "/products" with the actual path to ProductsPage
    }, 2000); // Wait 2 seconds before redirecting
  };



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        setProducts(response.data);

      } catch (error) {
        console.log('Error Fetching products: ', error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 "> All Menus</h1>
      <div className="row">

        {
          products.map((m) => (
            <div className="col-md-3 mb-4" key={m.menu_item_id}>
              <ProductCard
                id={m.menu_item_id}
                productName={m.menu_item_name}
                price={m.menu_item_price}
                imageUrl={m.image_url}
              
                onAddToCart={() => {
                  handleAddToCart(p);
                }}
              />
            </div>
          ))
        }
      </div>
    </div >
  );
}

export default ProductPage;