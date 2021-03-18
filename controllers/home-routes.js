const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Comment, Rating, Wishlist } = require('../models');


const fetch = require("node-fetch");


// get all products-ext
router.get('/', async function(req, res)  {

    console.log('======================');
    let queryUrl = 'http://localhost:3001/api/products/api/productsexternal/'
     await fetch(queryUrl)
        .then(async function(response) {
          if (!response.ok) {
            return console.log('Error: productsexternal');
          }
          return await response.json();
        })
        .then(async function(products) {   
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
  
 

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
