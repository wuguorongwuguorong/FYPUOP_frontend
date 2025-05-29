import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import { useCart } from './CartStore';
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';


function HomePage() {
  const [products, setProducts] = useState([])

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
        <>
            <header className="bg-primary text-white text-center py-5">
                <div className="container">
                    <h1 className="display-4">Welcome to Hungry Panda</h1>
                    <p className="lead">Discover authenic Western Cusinie at unbeatable prices!</p>
                    <a href="#" className="btn btn-light btn-lg">Browse Now</a>
                </div>
            </header>

            <main className="container my-5">
                <h2 className="text-center mb-4">Featured Menu</h2>
                <div className="row">
                    {
                        products.map((p) => (
                            <div className="col-md-3 mb-4" key={p.order_item_id}>
                                <ProductCard
                                    menu_item_id={p.menu_item_id}
                                    productName={p.menu_item_name}
                                    price={p.price}
                                    imageUrl={p.imageUrl}

                                    onAddToCart={() => {
                                        handleAddToCart(p);
                                    }}
                                />
                            </div>
                        ))
                    }
                </div>
            </main >
        </>
    )
}
export default HomePage;