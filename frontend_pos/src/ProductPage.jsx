import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import { useCart } from './CartStore';
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';


function ProductPage() {

  const [products, setProducts] = useState([])
  const { showMessage } = useFlashMessage();
  const { addToCart } = useCart();
  const [, setLocation] = useLocation();

  const handleAddToCart = (m) => {
    addToCart({
      menu_id: m.menu_item_id,
      productName: m.menu_item_name,
      imageUrl: `${import.meta.env.VITE_API_URL}${m.image_url}`,
      price: m.price
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
        console.log('Fetched products:', response.data);
        setProducts(response.data);

      } catch (error) {
        console.log('Error Fetching products: ', error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 "> All Menu</h1>
      <div className="row">

        {
          products.map((m) => (
            <div className="col-md-3 mb-4" key={m.menu_item_id}>
              <ProductCard
                menu_item_id={m.menu_item_id}
                menu_item_name={m.menu_item_name}
                price={m.price}
                image_url={`${import.meta.env.VITE_API_URL}${m.image_url}`}

                onAddToCart={() => {
                  handleAddToCart(m);
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