const router = require('express').Router();
const sequelize = require('../config/connection');

const { User, Product,  Rating, Wishlist } = require('../models');
const withAuth = require('../utils/auth');

const fetch = require("node-fetch");



// get all products for home
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  let page = 0;
  if (req.query.page) {
    page = (req.query.page -1 ) * 11;
  }

  Product.findAndCountAll({
      attributes: [
        'id',
        'name',
        'api_id',
        'image_link',
        'description',
        'brand',
        'price',
        'rating',
        'category',
        'product_type',
        'featured',
        [sequelize.literal('(SELECT AVG(Rating) FROM rating WHERE product.id = rating.product_id)'), 'int_rating_avg']
      ],
      include: [
    
        {
          model: Rating,
          attributes: ['id', 'user_id', 'product_id', 'rating', 'date'],
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
      ],
      limit: 10,
      offset: page
    })
    .then(dbProductData => {
      console.log(`================== TOTAL ENTRIES ==================\n ${dbProductData.count}`);
      const products = dbProductData.rows.map(product => product.get({ plain: true }));
      res.render('homepage', {
        products,
        loggedIn: req.session.loggedIn,
      }
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// get filtered products
router.get('/products/:id', (req, res) => {
  Product.findAll({
    where: {
      Product_type: req.params.id
    },
    attributes: [
      'id',
      'name',
      'api_id',
      'image_link',
      'description',
      'brand',
      'price',
      'rating',
      'category',
      'product_type',
      'featured',
      [sequelize.literal('(SELECT Avg(rating) FROM rating WHERE rating.product_id = product.id)'), 'int_rating_avg']
    ],
    limit: 10
  })
  .then(dbProductData => {
    const products = dbProductData.map(product => product.get({ plain: true }));
    res.render('homepage', {
      products,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

  ////////login//////


router.get('/login', (req, res) => {
 
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
