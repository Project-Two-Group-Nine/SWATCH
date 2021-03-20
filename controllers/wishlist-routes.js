const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Comment, Rating, Wishlist } = require('../models');
const withAuth = require('../utils/auth');
const fetch = require("node-fetch");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;


// get all products for wishlist
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Product.findAll({
      where: {
        id : {[Op.in]: [sequelize.literal(`(SELECT unisque(product_id) FROM wishlist WHERE wishlist.user_id = ${req.session.user_id})`), 'id']}
      },
      attributes: [
        'id',
        'api_id',
        'name',
        'image_link',
        'description',
        'featured',
        [sequelize.literal('(SELECT AVG(Rating) FROM rating WHERE product.id = rating.product_id)'), 'int_rating_avg']
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

      res.render('wishlist', {
        products,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




////////////////////////////////


router.get('/edit/:id', withAuth, (req, res) => {
  Wishlist.findByPk(req.params.id, {
    attributes: [
      'id',
      'user_id',
      'wishlist',
      'date'
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email']
      },
      {
        model: Product,
        attributes: ['id', 'name', 'api_id','featured','int_rating_avg']
      }
    ]
  })
    .then(dbWishlistData => {
      if (dbWishlistData) {
      
        const wishlist = dbCommentData.get({ plain: true });
        res.render('edit-wishlist', {
          wishlist,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});





module.exports = router;
