import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useCart } from './CartStore';
import { useFlashMessage } from './FlashMessageStore';
import { useLocation } from 'wouter';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const { addToCart } = useCart();
  const { showMessage } = useFlashMessage();
  const [, setLocation] = useLocation();

  const [customerName, setCustomerName] = useState('');
  const [comment, setComment] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);
  const [comments, setComments] = useState([]);

  // Fetch data (products, popular products, and comments)
  const fetchData = async () => {
    try {
      // Fetching products
      const productsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      if (Array.isArray(productsResponse.data)) {
        setProducts(productsResponse.data);
      } else {
        console.error('Received products data is not an array');
        setProducts([]);
      }

      // Fetching popular products
      const popularResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/menu/popular`);
      if (Array.isArray(popularResponse.data)) {
        setPopularProducts(popularResponse.data);
      } else {
        console.error('Received popular products data is not an array');
        setPopularProducts([]);
      }

      // Fetching comments
      const commentsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments`);
      if (Array.isArray(commentsResponse.data)) {
        setComments(commentsResponse.data);
      } else {
        console.error('Received comments data is not an array');
        setComments([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    addToCart({
      order_item_id: Math.floor(Math.random() * 9999 + 1),
      menu_item_id: product.menu_item_id,
      productName: product.menu_item_name,
      image_url: product.image_url,
      price: product.price,
      quantity: 1,
    });

    showMessage("Product added to cart", "success");
    setLocation("/cart");
  };

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/comments`, {
        customer_name: customerName,
        comment,
      });
      setSubmitStatus('success');
      setComment('');
      fetchData(); // Fetch updated comments after successful submit
    } catch (error) {
      console.error('Error submitting comment:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <>
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to Hungry Panda</h1>
          <p className="lead">Discover Authentic Western Cuisine at unbeatable prices!</p>
        </div>
      </header>

      <main className="container my-5">
        {/* Popular Products Section */}
        {popularProducts.length > 0 && (
          <section className="mb-5">
            <h2 className="text-center mb-4">🔥 Customer Favorites</h2>
            <div className="row">
              {popularProducts.map((product) => (
                <div className="col-md-3 mb-4" key={`popular-${product.menu_item_id}`}>
                  <ProductCard
                    menu_item_id={product.menu_item_id}
                    productName={product.menu_item_name}
                    price={product.price}
                    image_url={product.image_url}
                    orderCount={product.total_orders}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Products Section */}
        <section className="mb-5">
          <h2 className="text-center mb-4">Our Menu</h2>
          <div className="row">
            {products.map((product) => (
              <div className="col-md-3 mb-4" key={product.menu_item_id}>
                <ProductCard
                  menu_item_id={product.menu_item_id}
                  productName={product.menu_item_name}
                  price={product.price}
                  image_url={product.image_url}
                  onAddToCart={() => handleAddToCart(product)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Comment Section */}
        <section className="container my-5">
          <h2 className="text-center mb-4">💬 Leave a Comment</h2>
          <form onSubmit={handleCommentSubmit} className="col-md-6 offset-md-3">
            <div className="mb-3">
              <label className="form-label">Customer Name</label>
              <input
                type="text"
                className="form-control"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Comment</label>
              <textarea
                className="form-control"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            {submitStatus === 'success' && (
              <div className="alert alert-success mt-3">Comment submitted successfully!</div>
            )}
            {submitStatus === 'error' && (
              <div className="alert alert-danger mt-3">Failed to submit comment.</div>
            )}
          </form>
        </section>

        {/* Display Comments Section */}
        <section className="container my-5">
          <h2 className="text-center mb-4">💬 Customer Comments</h2>
          <div className="list-group">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="list-group-item">
                  <strong>{comment.customer_name}</strong>
                  <p>{comment.comment}</p>
                  <small className="text-muted">{new Date(comment.created_at).toLocaleString()}</small>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
