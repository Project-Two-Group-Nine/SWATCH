const { Product } = require('../models');
const newData = require('../db/products.json');


var seedProducts =  async function() {
  await Product.bulkCreate(newData);
}


module.exports = seedProducts;


