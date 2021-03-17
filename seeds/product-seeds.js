const { Product } = require('../models');

const productdata = [
  {
    name: 'Lip Stick',
    api_id: 111,
    featured: 0,
    rating_avg: 0
  },
  {
    name: 'Eye liner',
    api_id: 112,
    featured: 1,
    rating_avg: 3
  },
  {
    name: 'Blush',
    api_id: 113,
    featured: 0,
    rating_avg: 1
  }
];

const seedProducts = () => Product.bulkCreate(productdata);

module.exports = seedProducts;
