import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import BackgroundSection from "./BackgroundSection";
import CardsSection from "./CardsSection";
import DescriptionSection from "./DescriptionSection";
import FooterSection from "./FooterSection";
import ProductCard from "./ProductCard";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const HomePage = () => {
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://check-my-car.onrender.com/api/products");
        const data = await response.json();
        setFeaturedProducts(data.slice(0, 4)); // Get the first four products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const onAddToCart = (product) => {
    handleAddToCart({ ...product, quantity: 1 });
    navigate("/cart");
  };

  return (
    <div>
      <Navbar />
      <BackgroundSection />
      <CardsSection />
      <DescriptionSection />
      <div className="my-8">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Featured Products
        </h2>
        <div className="flex flex-wrap justify-center mb-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              image={`https://check-my-car.onrender.com${product.image}`} // Correctly referencing the image path
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>
        <div className="text-center mt-4">
          <Link
            to="/car-parts"
            className="text-orange-500 hover:text-orange-700 text-lg font-bold"
          >
            Browse More
          </Link>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default HomePage;
