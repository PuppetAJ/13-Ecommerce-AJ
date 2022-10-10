// Import Tag model
const { Tag } = require('../models');

// Data we want to seed
const tagData = [
  {
    tag_name: 'rock music',
  },
  {
    tag_name: 'pop music',
  },
  {
    tag_name: 'blue',
  },
  {
    tag_name: 'red',
  },
  {
    tag_name: 'green',
  },
  {
    tag_name: 'white',
  },
  {
    tag_name: 'gold',
  },
  {
    tag_name: 'pop culture',
  },
];

// Function to seed Tag model (table)
const seedTags = () => Tag.bulkCreate(tagData);

// Export function
module.exports = seedTags;
