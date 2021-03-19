const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Comment, Rating, Wishlist } = require('../models');

const fetch = require("node-fetch");



// for external data, append internal data
var product_append_int =  async function(id) {
  let result=[];
  let emptyIntProduct ={
    "int_id" : 0,
    "int_name" : 0,
    "int_api_id" : 0,
    "int_featured" : 0}
  let queryUrl = 'http://localhost:3001/api/productsexternal/'+id
     await fetch(queryUrl)
        .then(async function(response) {
          if (!response.ok) {
            return console.log('Error: productsexternal');
          }
          return await response.json();
        })
        .then(async function(data) {
          for (var i = 0; i < data.length; i++) {
            let queryUrl = 'http://localhost:3001/api/products/'+data[i].id
             await fetch(queryUrl)
                .then(async function(response){
                  if (!response.ok) {
                    return console.log('Error: products');
                  }
                  return response.json();
                })
                .then(async function(intProduct) {
                if (!intProduct ){
                  result.push(JSON.parse(JSON.stringify( { ...data[i], ...emptyIntProduct } )));
                }
                else {
                  result.push(JSON.parse(JSON.stringify( { ...data[i], ...intProduct }) ));
                  
                }
              })
            } 
        })
        .catch(function(error) {
          console.log("Unable to connect" + error);
       });  
  return result; 
};



// get one products-ext and append internal data
router.get('/:id', async function(req, res)  {
    console.log('======================');
    var products = await product_append_int(req.params.id)
        res.render('productpage', {
          products,
          loggedIn: req.session.loggedIn
        });
  });
  
 
/*
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
*/



module.exports = router;
