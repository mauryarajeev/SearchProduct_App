import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import BrandList from './BrandList';
import './ProductList.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: string;
  name: string;
  wishlist: boolean;
  image?: string;
}

const { faker } = require('@faker-js/faker');

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const newProducts = Array.from({ length: 100 }, () => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        wishlist: false,
        image: '',
      }));

      const productsWithImages = await Promise.all(
        newProducts.map(async (product) => {
          try {
            const productNameWords = product.name.split(' ');
            const query = productNameWords[productNameWords.length - 1];
            const response = await axios.get(`https://api.unsplash.com/search/photos`, {
              params: {
                query,
                per_page: 1,
                client_id: 'U5xvLk05symVznb1MdKJ8mw6FpGuKTe8V6tHTgotPhE', // Replace with your Unsplash API key
              },
            });

            if (response.data.results.length > 0) {
              const image = response.data.results[0].urls.small;
              return { ...product, image };
            }
          } catch (error) {
            console.error(`Error fetching image for ${product.name}:`, error);
          }

          return product;
        })
      );

      setProducts(productsWithImages);
    };

    fetchProducts();
  }, []);

  const handleLikeToggle = (productId: string) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, wishlist: !product.wishlist } : product
    );
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      openModal();
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products by name"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={openModal} />
      </div>
      {showModal && (
        <div className="modal">
          <BrandList />
          <div className="modal-content">
            <button onClick={closeModal} className="close-button">
              &times;
            </button>
            <div className="product-list">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onLikeToggle={() => handleLikeToggle(product.id)}
                />
              ))}
            </div>
            <h3>Suggestions</h3>
            <ul className="hardcoded-list" style={{color:'black'}}>
  <li className="hardcoded-list-item" style={{color:'black'}}>Striped Shirt</li>
  <li className="hardcoded-list-item" style={{color:'black'}}>Denim Shirt</li>
  <li className="hardcoded-list-item" style={{color:'black'}}>Lada Jacket</li>
  <li className="hardcoded-list-item" style={{color:'black'}}>Denim Jeans</li>
  <li className="hardcoded-list-item" style={{color:'black'}}>Modern Blazer</li>
  <li className="hardcoded-list-item" style={{color:'black'}}>Safari Shoe</li>
</ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
