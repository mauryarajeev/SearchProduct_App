import React from 'react';

interface BrandListProps {
  brandNames: string[];
  priceRanges: { [key: string]: string };
  ratings: { [key: string]: string };
}

const BrandList: React.FC<BrandListProps> = ({ brandNames, priceRanges, ratings }) => {
  return (
    <div style={{paddingRight:'30px',paddingLeft:'0px',cursor:'pointer'}}>
      <h2>Brand Names:</h2>
      <ul>
        {brandNames.map((brand, index) => (
          <li key={index}>{brand}</li>
        ))}
      </ul>

      <h2>Price Ranges:</h2>
      <ul>
        {Object.keys(priceRanges).map((price, index) => (
          <li key={index}>
            {price} - {priceRanges[price]}
          </li>
        ))}
      </ul>

      <h2>Ratings:</h2>
      <ul>
        {Object.keys(ratings).map((rating, index) => (
          <li key={index}>
            {rating} - {ratings[rating]}
          </li>
        ))}
      </ul>
    </div>
  );
};

const brandNames = ['StellarTech', 'LuxeWave', 'EcoFusion'];
const priceRanges = {
  '$': 'Affordable',
  '$$': 'Mid-Range',
  '$$$': 'High-End',
};
const ratings = {
  '★': '1 star',
  '★★': '2 stars',
  '★★★': '3 stars',
  '★★★★': '4 stars',
  '★★★★★': '5 stars',
};

export default () => (
  <BrandList brandNames={brandNames} priceRanges={priceRanges} ratings={ratings} />
);
