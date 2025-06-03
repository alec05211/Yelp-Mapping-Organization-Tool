import React from 'react';
import './FoodRecSection.css';

const FoodRecSection = ({ onCategoryClick }) => {
  const categories = [
    'Ramen',
    'Pizza',
    'Sushi',
    'Burgers',
    'Mexican',
    'Italian',
    'Thai',
    'Indian'
  ];

  return (
    <div className="food-rec-container">
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className="category-button"
            onClick={() => onCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FoodRecSection;