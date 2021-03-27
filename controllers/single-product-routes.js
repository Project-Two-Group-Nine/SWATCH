const router = require('express').Router();
const sequelize = require('../config/connection');

const { User, Product,  Rating, Wishlist } = require('../models');
const withAuth = require('../utils/auth');

const fetch = require("node-fetch");



// get all products for single product , withAuth

router.get('/:id', (req, res) => {
  Product.findAll({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'api_id',
      'image_link',
      'brand',
      'price',
      'rating',
      'description',
      'category',
      'product_type',
      'featured',
      [sequelize.literal('(SELECT round(Avg(rating),0) FROM rating WHERE rating.product_id = product.id)'), 'int_rating_avg']
    ],
    include: [
      {
        model: Rating,
        attributes: ['id', 'user_id', 'product_id','rating','rating_commentary' ,'date'],
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      },
      {
        model: Wishlist,
        attributes: ['id', 'user_id', 'product_id','wish_list', 'date'],
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      }
    ]
  })
  .then( dbProductData => {   
    const products = dbProductData.map(item => item.get({ plain: true }));
    res.render('single-product', { products, loggedIn: req.session.loggedIn });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
