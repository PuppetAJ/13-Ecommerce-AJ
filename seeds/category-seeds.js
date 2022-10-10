// import our model data
const { Category } = require('../models');

// data we want to insert into model
const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

// function to seed Category model
const seedCategories = () => Category.bulkCreate(categoryData);

// exports function
module.exports = seedCategories;
