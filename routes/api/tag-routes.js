const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: {
      // Includes associated product data
      model: Product,
      attributes: ['product_name','price','stock'],
      // through: {attributes:[]}
    }
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    attributes: ['id', 'tag_name'],
    where: {
      id: req.params.id
    },
    include: {
      // Includes associated product data
      model: Product,
      attributes: ['product_name', 'price', 'stock'],
      // through: {attributes:[]}
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tagData) => {
    // Checks if the user included a productIds array
    if(req.body.productIds !== undefined) {
      // If the user did include an array, then map the ids into an object, and bulkCreate those associations in the ProductTag model
      const productTagIdArr = req.body.productIds.map((product_id) => {
        return {
          product_id,
          tag_id: tagData.id,
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    }
    // If not send ok status with tagData
    res.status(200).json(tagData);
  })
  .then((productTagIds) => res.status(200).json(productTagIds))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    // If the productIds array is NOT undefined, then find all the ProductTag instances where the tag_id are equal to the id in the paramater
    if (req.body.productIds !== undefined) {
      return ProductTag.findAll({ where: { tag_id: req.params.id } });
    }
    // otherwise, just send and ok status with the data
    res.status(200).json(tagData);
  })
  .then((productTags) => {
    // IF productTags is not undefined execute the following code
    if (productTags !== undefined) {
      // get a list of current product_ids
      const productTagIds = productTags.map(({ product_id }) => product_id);
      // create filtered list of new product_ids
      const newProductTags = req.body.productIds
        .filter((product_id) => !productTagIds.includes(product_id))
        .map((product_id) => {
          return {
            product_id,
            tag_id: req.params.id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ product_id }) => !req.body.productIds.includes(product_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }
  })
  .then((updatedProductTags) => {
    // If data is passed send a json response
    if(updatedProductTags !== undefined) {
      res.json(updatedProductTags)
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Export routes
module.exports = router;
