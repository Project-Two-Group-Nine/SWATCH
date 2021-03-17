const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Comment, Rating, Wishlist } = require('../models');

// get all products for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Product.findAll({
    attributes: [
      'id',
      'name',
      'api_id',
      'featured',
      [sequelize.literal('(SELECT AVG(rating) FROM rating WHERE product.id = rating.product_id)'), 'rating_avg']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'user_id' ,'product_id', 'comment', 'date'],
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      },
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

// get single product
router.get('/products/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'api_id',
      'featured',
      [sequelize.literal('(SELECT AVG(rating) FROM rating WHERE product.id = rating.product_id)'), 'rating_avg']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'user_id' ,'product_id', 'comment', 'date'],
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      },
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
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }

      const product = dbProductData.get({ plain: true });

      res.render('single-product', {
        product,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
