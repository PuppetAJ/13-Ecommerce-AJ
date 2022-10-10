// Imports router
const router = require('express').Router();

// Imports all routes in the api folder
const apiRoutes = require('./api');

// All api routes will have /api before them
router.use('/api', apiRoutes);

// If the user navigates to an incorrect route, send this
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

// Export router
module.exports = router;