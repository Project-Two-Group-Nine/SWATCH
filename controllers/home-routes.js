const router = require('express').Router();
const sequelize = require('../config/connection');

const { User, Product,  Rating, Wishlist } = require('../models');
const withAuth = require('../utils/auth');

const fetch = require("node-fetch");



// get all products for home
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  // page references for returned products
  let page = 0;
  let pageStart = 0;
  if (req.query.page) {
    page = req.query.page;
    pageStart = (req.query.page -1 ) * 10;
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
      offset: pageStart
    })
    .then(dbProductData => {
      let products = dbProductData.rows.map(product => product.get({ plain: true }));
      //send total number of pages for frontend pagination
      products.page_total = Math.floor((dbProductData.count/10) +1);
      
      res.render('homepage', {
        products,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// get filtered products
router.get('/products/:id', (req, res) => {
  // page references for returned products
  let page = 0;
  let pageStart = 0;
  if (req.query.page) {
    page = req.query.page;
    pageStart = (req.query.page -1 ) * 10;
  }
  
  Product.findAndCountAll({
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
    limit: 10,
    offset: pageStart
  })
  .then(dbProductData => {
    console.log(`\n+++++++++++++++++++++ Product Total: ${dbProductData.count} +++++++++++++++++++++++++++++\n`)
    let products = dbProductData.rows.map(product => product.get({ plain: true }));
    //send total number of pages for frontend pagination
    products.page_total = Math.floor((dbProductData.count/10) +1);
    console.log(`\n+++++++++++++++++++++ Page Total: ${products.page_total} +++++++++++++++++++++++++++++\n`)

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
