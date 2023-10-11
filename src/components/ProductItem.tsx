import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  wishlist: boolean;
}

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  const toggleWishlist = () => {
    // Implement wishlist toggle logic here
    console.log(`Toggling wishlist for product: ${product.name}`);
  };

  return (
    <div
      className={`product-item ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2>{product.name}</h2>
      <button onClick={toggleWishlist} className={product.wishlist ? 'red' : ''}>
        Wishlist
      </button>
      {hovered && <button>View Product</button>}
    </div>
  );
};

export default ProductItem;
