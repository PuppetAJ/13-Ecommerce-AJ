// Import router and routes
const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Use /categories before categoryRoutes
router.use('/categories', categoryRoutes);
// Use /products before productRoutes
router.use('/products', productRoutes);
// Use /tags before tagRoutes
router.use('/tags', tagRoutes);

// Export router
module.exports = router;
