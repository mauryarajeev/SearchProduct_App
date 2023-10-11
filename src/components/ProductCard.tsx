import React from 'react';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: string;
  name: string;
  wishlist: boolean;
  image?: string;
}

interface ProductCardProps {
  product: Product;
  onLikeToggle: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onLikeToggle }) => {
  const handleImageClick = () => {
    onLikeToggle();
  };

  // Generate a random price between $10 and $100 for the product
  const randomPrice = `$${(Math.random() * 90 + 10).toFixed(2)}`;

// ...

// Generate a random product rating between 0 and 5 as a number
const randomRating = parseFloat((Math.random() * 5).toFixed(1));

// Create a component to display the product rating in stars
const ProductRating = () => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < randomRating) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="star-icon filled" />
      );
    } else {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />
      );
    }
  }
  return <div className="product-rating">{stars}</div>;
};

// ...


  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', height: '100%' }}
        onClick={handleImageClick}
      />
      <p>{product.name}</p>
      <div className="like-button" onClick={onLikeToggle}>
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <div className="product-price">{randomPrice}</div>
      <ProductRating />
      <div className="view-button">
        <button>View Product</button>
      </div>
    </div>
  );
};

export default ProductCard;
