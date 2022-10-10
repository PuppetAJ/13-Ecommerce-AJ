// Import seeding functions
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

// Import sequelize connection
const sequelize = require('../config/connection');

// asynchronous seedAll function
const seedAll = async () => {
  // Overwrites existing tables when syncing to database
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  // executes seedCategories function
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');
  // executes seedProducts function
  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');
  // executes seedTags function
  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');
  // executes seedProductTags function
  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');
  // exits the process
  process.exit(0);
};

// runs the function when the script is called
seedAll();
