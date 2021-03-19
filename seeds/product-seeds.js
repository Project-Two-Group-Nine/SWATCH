const { Product } = require('../models');

const productdata = [
  {
    int_name: 'Lippie Pencil',
    int_api_id: 1048,
    fint_eatured: 0,
    int_rating_avg: 0
  },
  {
    int_name: 'Blotted Lip',
    int_api_id: 1047,
    int_featured: 1,
    int_rating_avg: 3
  },
  {
    int_name: 'Lippie Stix',
    int_api_id: 1046,
    int_featured: 0,
    int_rating_avg: 1
  }
];

const seedProducts = () => Product.bulkCreate(productdata);

module.exports = seedProducts;
