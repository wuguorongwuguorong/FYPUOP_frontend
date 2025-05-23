import React from 'react';
import ProductCard from './ProductCard';


function HomePage() {

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
                    <div className="col-md-3 mb-4">
                        <ProductCard
                            image_url="https://picsum.photos/id/20/300/200"
                            menu_item_name="Fish & Chip"
                            menu_item_price="13.99"
                        />
                    </div>

                    <div className="col-md-3 mb-4">
                        <ProductCard
                            image_url="https://picsum.photos/id/1/300/200"
                            menu_item_name="Black Pepper Chicken Chop"
                            menu_item_price="11.99"
                        />
                    </div>

                    <div className="col-md-3 mb-4">
                        <ProductCard
                            image_url="https://picsum.photos/id/26/300/200"
                            menu_item_name="Rip Eye Steak"
                            menu_item_price="18.99"
                        />
                    </div>

                    <div className="col-md-3 mb-4">
                        <ProductCard
                            image_url="https://picsum.photos/id/96/300/200"
                            menu_item_name="Lamb Chop"
                            menu_item_price="12.99"
                        />
                    </div>
                </div>
            </main>
        </>
    )
}
export default HomePage;